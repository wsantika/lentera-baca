"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function loginWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback`,
    },
  });

  if (error) {
    redirect("/login?error=google_login_failed");
  }

  if (data.url) {
    redirect(data.url);
  }
}

export async function loginWithEmail(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/login?error=invalid_credentials");
  }

  revalidatePath("/", "layout");
  redirect("/parent");
}

export async function signupWithEmail(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback`,
    },
  });

  if (error) {
    redirect("/signup?error=signup_failed");
  }

  revalidatePath("/", "layout");
  redirect("/signup?message=check_email");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function setActiveChild(childId: string) {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  cookieStore.set("lentera_active_child", childId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  revalidatePath("/", "layout");
}

export async function createChildProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }

  const displayName = formData.get("display_name") as string;
  const ageStr = formData.get("age") as string;
  const age = ageStr ? parseInt(ageStr, 10) : null;
  const avatarEmoji = (formData.get("avatar_emoji") as string) || "🦁";

  const { error } = await supabase.from("child_profiles").insert({
    parent_id: user.id,
    display_name: displayName,
    age: age,
    avatar_emoji: avatarEmoji,
  });

  if (error) {
    console.error(error);
    throw new Error("Failed to create child profile");
  }

  revalidatePath("/parent");
}

export async function updateChildProfile(childId: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }

  const displayName = formData.get("display_name") as string;
  const ageStr = formData.get("age") as string;
  const age = ageStr ? parseInt(ageStr, 10) : null;
  const avatarEmoji = (formData.get("avatar_emoji") as string) || "🦁";

  const { error } = await supabase
    .from("child_profiles")
    .update({
      display_name: displayName,
      age: age,
      avatar_emoji: avatarEmoji,
    })
    .eq("id", childId)
    .eq("parent_id", user.id);

  if (error) {
    console.error(error);
    throw new Error("Failed to update child profile");
  }

  revalidatePath("/parent");
}

export async function deleteChildProfile(childId: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("child_profiles")
    .delete()
    .eq("id", childId);

  if (error) {
    console.error(error);
    throw new Error("Failed to delete child profile");
  }

  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const activeChild = cookieStore.get("lentera_active_child")?.value;
  if (activeChild === childId) {
    cookieStore.delete("lentera_active_child");
  }

  revalidatePath("/parent");
}
