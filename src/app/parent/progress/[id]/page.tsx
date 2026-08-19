import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star, BookOpen, PenTool, Flame } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Progres Anak - Lentera Baca",
};

export default async function ProgressDashboardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const childId = resolvedParams.id;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 1. Verify ownership and get child info
  const { data: childProfile } = await supabase
    .from("child_profiles")
    .select("*")
    .eq("id", childId)
    .eq("parent_id", user.id)
    .single();

  if (!childProfile) {
    redirect("/parent");
  }

  // ponytail: YAGNI complex aggregation, fetch minimal parallel data
  const [lettersRes, readingRes, pointsRes, recentPointsRes] = await Promise.all([
    supabase
      .from("letter_progress")
      .select("id", { count: "exact", head: true })
      .eq("child_id", childId)
      .eq("completed", true),
    supabase
      .from("reading_progress")
      .select("id", { count: "exact", head: true })
      .eq("child_id", childId)
      .eq("completed", true),
    supabase
      .from("point_events")
      .select("points")
      .eq("child_id", childId),
    supabase
      .from("point_events")
      .select("points, event_date")
      .eq("child_id", childId)
      .order("event_date", { ascending: false })
      .limit(50),
  ]);

  const masteredLetters = lettersRes.count || 0;
  const completedReading = readingRes.count || 0;
  
  const totalPoints = pointsRes.data?.reduce((acc, row) => acc + (row.points || 0), 0) || 0;

  // ponytail: simplistic streak calculation based on unique days
  let streak = 0;
  if (recentPointsRes.data && recentPointsRes.data.length > 0) {
    const uniqueDates = Array.from(new Set(recentPointsRes.data.map(d => d.event_date))).sort((a, b) => b.localeCompare(a));
    const todayStr = new Date().toISOString().split('T')[0];
    
    const currentCheck = new Date();
    if (!uniqueDates.includes(todayStr)) {
      currentCheck.setDate(currentCheck.getDate() - 1); 
    }

    for (const d of uniqueDates) {
      if (d === currentCheck.toISOString().split('T')[0]) {
        streak++;
        currentCheck.setDate(currentCheck.getDate() - 1);
      } else {
        break;
      }
    }
  }

  // ponytail: pure CSS bar chart for 7 days
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const points = recentPointsRes.data
      ?.filter(evt => evt.event_date === dateStr)
      .reduce((acc, row) => acc + (row.points || 0), 0) || 0;
    
    return { date: d.toLocaleDateString("id-ID", { weekday: 'short' }), points };
  });

  const maxPointsInWeek = Math.max(...last7Days.map(d => d.points), 100);

  return (
    <div className="min-h-dvh bg-[#f3f0ea] p-4 sm:p-8">
      <main className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/parent"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm hover:bg-stone-50"
          >
            <ArrowLeft className="h-5 w-5 text-stone-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
              {childProfile.avatar_emoji} Progres {childProfile.display_name}
            </h1>
            <p className="text-sm text-stone-500">
              Pantau aktivitas belajar dan perkembangan anak.
            </p>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard icon={<Star className="text-amber-500" />} title="Total Poin" value={totalPoints} />
          <StatCard icon={<Flame className="text-orange-500" />} title="Streak Harian" value={`${streak} Hari`} />
          <StatCard icon={<PenTool className="text-blue-500" />} title="Suku Kata" value={masteredLetters} />
          <StatCard icon={<BookOpen className="text-green-500" />} title="Modul Membaca" value={completedReading} />
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className="sm:col-span-2 rounded-2xl border border-stone-200/60 bg-white p-6 shadow-sm">
            <h2 className="mb-6 font-semibold text-stone-800">Aktivitas 7 Hari Terakhir</h2>
            <div className="flex h-48 items-end justify-between gap-2">
              {last7Days.map((day, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                  <div className="relative w-full max-w-[40px] flex-1 rounded-t-md bg-stone-100 flex items-end">
                    <div 
                      className="w-full rounded-t-md bg-orange-400 transition-all"
                      style={{ height: `${(day.points / maxPointsInWeek) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-stone-500">{day.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200/60 bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-semibold text-stone-800">Rekomendasi</h2>
            <div className="space-y-4">
              <div className="rounded-xl bg-blue-50 p-4">
                <p className="text-sm font-medium text-blue-900">Fokus Latihan</p>
                <p className="mt-1 text-xs text-blue-700">
                  {masteredLetters < 26 
                    ? "Ajak anak menyelesaikan lebih banyak huruf dasar."
                    : "Anak berkembang pesat! Lanjutkan ke membaca kalimat."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, title, value }: { icon: React.ReactNode, title: string, value: string | number }) {
  return (
    <div className="rounded-2xl border border-stone-200/60 bg-white p-4 shadow-sm flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">{title}</span>
        {icon}
      </div>
      <p className="text-2xl font-bold text-stone-800">{value}</p>
    </div>
  );
}
