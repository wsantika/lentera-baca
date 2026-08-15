import { NextRequest, NextResponse } from "next/server";
import {
  fetchChildProgress,
  syncLetterComplete,
  syncReadingComplete,
  syncStreakBonus,
  syncAccessibilitySettings,
  bulkSyncProgress,
} from "@/lib/supabase/sync";

export async function GET(request: NextRequest) {
  const childId = request.nextUrl.searchParams.get("childId");
  if (!childId) {
    return NextResponse.json({ error: "Missing childId" }, { status: 400 });
  }

  try {
    const data = await fetchChildProgress(childId);
    return NextResponse.json({ data });
  } catch (error) {
    console.error("GET /api/sync error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, payload } = body;

    if (!action || !payload) {
      return NextResponse.json({ error: "Missing action or payload" }, { status: 400 });
    }

    const { childId } = payload;
    if (!childId) {
      return NextResponse.json({ error: "Missing childId" }, { status: 400 });
    }

    let result;

    switch (action) {
      case "syncLetter":
        result = await syncLetterComplete(childId, payload.letter);
        break;
      case "syncReading":
        result = await syncReadingComplete(childId, payload.exerciseId, payload.score, payload.level);
        break;
      case "syncStreak":
        result = await syncStreakBonus(childId, payload.streakCount);
        break;
      case "syncSettings":
        result = await syncAccessibilitySettings(childId, payload.settings);
        break;
      case "bulkSync":
        result = await bulkSyncProgress(childId, payload.data);
        break;
      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("POST /api/sync error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
