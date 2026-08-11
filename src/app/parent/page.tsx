import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { LogOut, Settings, Users } from "lucide-react";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/supabase/actions";
import { ChildrenManagement } from "@/components/parent/children-management";

export const metadata = {
  title: "Dashboard Orang Tua",
  description: "Kelola profil anak dan pantau progres belajar.",
};

export default async function ParentDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch profile data
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Fetch child profiles
  const { data: children } = await supabase
    .from("child_profiles")
    .select("id, display_name, avatar_emoji, age")
    .eq("parent_id", user.id)
    .order("created_at", { ascending: true });

  const cookieStore = await cookies();
  const activeChildId = cookieStore.get("lentera_active_child")?.value || null;

  const displayName =
    profile?.full_name ||
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "Orang Tua";

  const avatarUrl =
    profile?.avatar_url ||
    user.user_metadata?.avatar_url ||
    user.user_metadata?.picture;

  return (
    <div className="min-h-dvh bg-[#f3f0ea]">
      {/* Header */}
      <header className="border-b border-stone-200/60 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border-2 border-amber-200"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-sm font-bold text-white">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-stone-800">
                {displayName}
              </p>
              <p className="text-xs text-stone-500">{user.email}</p>
            </div>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl border border-stone-200 px-3 py-2 text-xs font-medium text-stone-600 transition-all hover:bg-stone-50 hover:shadow-sm active:scale-[0.97]"
            >
              <LogOut className="h-3.5 w-3.5" />
              Keluar
            </button>
          </form>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
        <h1 className="mb-6 text-xl font-bold text-stone-800">
          Dashboard Orang Tua
        </h1>

        {/* Quick Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-stone-200/60 bg-white p-5 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-stone-500">
              <Users className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wide">
                Profil Anak
              </span>
            </div>
            <p className="text-2xl font-bold text-stone-800">
              {children?.length ?? 0}
            </p>
            <p className="mt-1 text-xs text-stone-400">
              anak terdaftar
            </p>
          </div>
          <div className="rounded-2xl border border-stone-200/60 bg-white p-5 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-stone-500">
              <Settings className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wide">
                Akun
              </span>
            </div>
            <p className="text-sm font-medium text-stone-800">
              {user.app_metadata?.provider === "google"
                ? "Login via Google"
                : "Login via Email"}
            </p>
            <p className="mt-1 text-xs text-stone-400">
              Bergabung{" "}
              {new Date(user.created_at).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Children List */}
        <ChildrenManagement 
          childrenProfiles={children || []} 
          activeChildId={activeChildId} 
        />

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-stone-400 underline-offset-4 hover:text-stone-600 hover:underline"
          >
            ← Kembali ke beranda anak
          </Link>
        </div>
      </main>
    </div>
  );
}
