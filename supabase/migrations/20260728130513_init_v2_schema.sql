-- =============================================================================
-- Lentera Baca V2 — Initial Database Schema
-- Migration: init_v2_schema
-- Description: Create all tables, RLS policies, indexes, and triggers
--              for the MVP V2 database (auth, child profiles, progress, points).
-- =============================================================================

-- ==========================================
-- 1. HELPER FUNCTIONS
-- ==========================================

-- Auto-update `updated_at` column on row update
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security definer
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

-- Auto-create profile on new user signup (Google OAuth)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, email, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', ''),
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', new.raw_user_meta_data ->> 'picture', '')
  );
  return new;
end;
$$;

-- ==========================================
-- 2. TABLES
-- ==========================================

-- Profiles: Parent/guardian accounts (linked 1:1 to auth.users)
create table public.profiles (
  id uuid not null primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  avatar_url text,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone('utc'::text, now())
);

comment on table public.profiles is 'Profil orang tua/pendamping, terhubung 1:1 dengan auth.users';

-- Child Profiles: Children managed by a parent
create table public.child_profiles (
  id uuid not null primary key default gen_random_uuid(),
  parent_id uuid not null references public.profiles(id) on delete cascade,
  display_name text not null,
  avatar_emoji text not null default '🦁',
  age smallint check (age >= 3 and age <= 12),
  accessibility_settings jsonb not null default '{
    "textSize": "normal",
    "highContrast": false,
    "autoAudio": false,
    "learningMode": "easy"
  }'::jsonb,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone('utc'::text, now())
);

comment on table public.child_profiles is 'Profil anak yang terikat dengan orang tua. Satu parent bisa memiliki banyak child.';

-- Letter Progress: Track which letters each child has learned
create table public.letter_progress (
  id uuid not null primary key default gen_random_uuid(),
  child_id uuid not null references public.child_profiles(id) on delete cascade,
  letter text not null,
  completed boolean not null default false,
  completed_at timestamp with time zone,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  unique (child_id, letter)
);

comment on table public.letter_progress is 'Tracking penguasaan huruf per anak. Satu record per huruf per anak.';

-- Reading Progress: Track reading exercises per child
create table public.reading_progress (
  id uuid not null primary key default gen_random_uuid(),
  child_id uuid not null references public.child_profiles(id) on delete cascade,
  exercise_id text not null,
  level text not null default 'easy',
  score integer not null default 0,
  completed boolean not null default false,
  completed_at timestamp with time zone,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  unique (child_id, exercise_id)
);

comment on table public.reading_progress is 'Tracking latihan membaca per anak. Satu record per exercise per anak.';

-- Point Events: Log of points earned by each child
create table public.point_events (
  id uuid not null primary key default gen_random_uuid(),
  child_id uuid not null references public.child_profiles(id) on delete cascade,
  event_type text not null,
  points integer not null default 0,
  description text,
  event_date date not null default current_date,
  created_at timestamp with time zone not null default timezone('utc'::text, now())
);

comment on table public.point_events is 'Log poin dan achievement anak. Event types: letter_complete, reading_complete, streak_bonus, daily_login';

-- ==========================================
-- 3. INDEXES
-- ==========================================

create index idx_child_profiles_parent_id on public.child_profiles(parent_id);
create index idx_letter_progress_child_id on public.letter_progress(child_id);
create index idx_reading_progress_child_id on public.reading_progress(child_id);
create index idx_point_events_child_id on public.point_events(child_id);
create index idx_point_events_event_date on public.point_events(event_date);

-- ==========================================
-- 4. ROW LEVEL SECURITY (RLS)
-- ==========================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.child_profiles enable row level security;
alter table public.letter_progress enable row level security;
alter table public.reading_progress enable row level security;
alter table public.point_events enable row level security;

-- Profiles: Users can only read and update their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Child Profiles: Parents can CRUD their own children only
create policy "Parents can view own children"
  on public.child_profiles for select
  using (auth.uid() = parent_id);

create policy "Parents can insert own children"
  on public.child_profiles for insert
  with check (auth.uid() = parent_id);

create policy "Parents can update own children"
  on public.child_profiles for update
  using (auth.uid() = parent_id);

create policy "Parents can delete own children"
  on public.child_profiles for delete
  using (auth.uid() = parent_id);

-- Letter Progress: Access via child ownership
create policy "Parents can view child letter progress"
  on public.letter_progress for select
  using (
    exists (
      select 1 from public.child_profiles
      where child_profiles.id = letter_progress.child_id
        and child_profiles.parent_id = auth.uid()
    )
  );

create policy "Parents can insert child letter progress"
  on public.letter_progress for insert
  with check (
    exists (
      select 1 from public.child_profiles
      where child_profiles.id = letter_progress.child_id
        and child_profiles.parent_id = auth.uid()
    )
  );

create policy "Parents can update child letter progress"
  on public.letter_progress for update
  using (
    exists (
      select 1 from public.child_profiles
      where child_profiles.id = letter_progress.child_id
        and child_profiles.parent_id = auth.uid()
    )
  );

create policy "Parents can delete child letter progress"
  on public.letter_progress for delete
  using (
    exists (
      select 1 from public.child_profiles
      where child_profiles.id = letter_progress.child_id
        and child_profiles.parent_id = auth.uid()
    )
  );

-- Reading Progress: Access via child ownership
create policy "Parents can view child reading progress"
  on public.reading_progress for select
  using (
    exists (
      select 1 from public.child_profiles
      where child_profiles.id = reading_progress.child_id
        and child_profiles.parent_id = auth.uid()
    )
  );

create policy "Parents can insert child reading progress"
  on public.reading_progress for insert
  with check (
    exists (
      select 1 from public.child_profiles
      where child_profiles.id = reading_progress.child_id
        and child_profiles.parent_id = auth.uid()
    )
  );

create policy "Parents can update child reading progress"
  on public.reading_progress for update
  using (
    exists (
      select 1 from public.child_profiles
      where child_profiles.id = reading_progress.child_id
        and child_profiles.parent_id = auth.uid()
    )
  );

create policy "Parents can delete child reading progress"
  on public.reading_progress for delete
  using (
    exists (
      select 1 from public.child_profiles
      where child_profiles.id = reading_progress.child_id
        and child_profiles.parent_id = auth.uid()
    )
  );

-- Point Events: Access via child ownership
create policy "Parents can view child point events"
  on public.point_events for select
  using (
    exists (
      select 1 from public.child_profiles
      where child_profiles.id = point_events.child_id
        and child_profiles.parent_id = auth.uid()
    )
  );

create policy "Parents can insert child point events"
  on public.point_events for insert
  with check (
    exists (
      select 1 from public.child_profiles
      where child_profiles.id = point_events.child_id
        and child_profiles.parent_id = auth.uid()
    )
  );

create policy "Parents can delete child point events"
  on public.point_events for delete
  using (
    exists (
      select 1 from public.child_profiles
      where child_profiles.id = point_events.child_id
        and child_profiles.parent_id = auth.uid()
    )
  );

-- ==========================================
-- 5. TRIGGERS
-- ==========================================

-- Auto-create profile on new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Auto-update updated_at on profiles
create trigger on_profiles_updated
  before update on public.profiles
  for each row execute function public.handle_updated_at();

-- Auto-update updated_at on child_profiles
create trigger on_child_profiles_updated
  before update on public.child_profiles
  for each row execute function public.handle_updated_at();
