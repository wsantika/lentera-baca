"use client";

import { useState } from "react";
import { Plus, Check, Trash2, Edit2 } from "lucide-react";
import {
  createChildProfile,
  updateChildProfile,
  setActiveChild,
  deleteChildProfile,
} from "@/lib/supabase/actions";

type ChildProfile = {
  id: string;
  display_name: string;
  avatar_emoji: string;
  age: number | null;
};

function ProfileForm({
  initialData,
  onSubmit,
  onCancel,
  title,
  isPending,
}: {
  initialData?: ChildProfile;
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
  title: string;
  isPending: boolean;
}) {
  return (
    <form
      action={onSubmit}
      className="mb-6 rounded-xl border border-stone-200 bg-stone-50 p-4"
    >
      <h3 className="mb-3 text-sm font-medium text-stone-800">{title}</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs text-stone-500">
            Nama Panggilan
          </label>
          <input
            type="text"
            name="display_name"
            defaultValue={initialData?.display_name || ""}
            required
            className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
            placeholder="Misal: Budi"
          />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="mb-1 block text-xs text-stone-500">
              Usia (opsional)
            </label>
            <input
              type="number"
              name="age"
              min="3"
              max="12"
              defaultValue={initialData?.age || ""}
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
              placeholder="5"
            />
          </div>
          <div className="w-20">
            <label className="mb-1 block text-xs text-stone-500">
              Emoji
            </label>
            <input
              type="text"
              name="avatar_emoji"
              defaultValue={initialData?.avatar_emoji || "🦁"}
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-center text-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-orange-500 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
        >
          {isPending ? "Menyimpan..." : "Simpan Profil"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="rounded-lg bg-stone-200 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-300 disabled:opacity-50"
        >
          Batal
        </button>
      </div>
    </form>
  );
}

export function ChildrenManagement({
  childrenProfiles,
  activeChildId,
}: {
  childrenProfiles: ChildProfile[];
  activeChildId: string | null;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleAddChild(formData: FormData) {
    setIsPending(true);
    try {
      await createChildProfile(formData);
      setIsAdding(false);
    } catch (error) {
      alert("Gagal menambahkan profil anak.");
    } finally {
      setIsPending(false);
    }
  }

  async function handleUpdateChild(id: string, formData: FormData) {
    setIsPending(true);
    try {
      await updateChildProfile(id, formData);
      setEditingId(null);
    } catch (error) {
      alert("Gagal memperbarui profil anak.");
    } finally {
      setIsPending(false);
    }
  }

  async function handleSetActive(id: string) {
    setIsPending(true);
    try {
      await setActiveChild(id);
    } catch (error) {
      alert("Gagal memilih profil aktif.");
    } finally {
      setIsPending(false);
    }
  }

  async function handleDeleteChild(id: string) {
    if (!confirm("Yakin ingin menghapus profil ini?")) return;
    setIsPending(true);
    try {
      await deleteChildProfile(id);
    } catch (error) {
      alert("Gagal menghapus profil.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="rounded-2xl border border-stone-200/60 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-stone-700">Profil Anak</h2>
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            disabled={isPending}
            className="flex items-center gap-1 rounded-lg bg-orange-100 px-3 py-1.5 text-xs font-semibold text-orange-700 transition hover:bg-orange-200"
          >
            <Plus className="h-4 w-4" />
            Tambah Anak
          </button>
        )}
      </div>

      {isAdding && (
        <ProfileForm
          title="Tambah Profil Baru"
          onSubmit={handleAddChild}
          onCancel={() => setIsAdding(false)}
          isPending={isPending}
        />
      )}

      {childrenProfiles.length > 0 ? (
        <ul className="space-y-3">
          {childrenProfiles.map((child) => {
            const isActive = activeChildId === child.id;
            
            if (editingId === child.id) {
              return (
                <li key={child.id}>
                  <ProfileForm
                    title="Edit Profil"
                    initialData={child}
                    onSubmit={(formData) => handleUpdateChild(child.id, formData)}
                    onCancel={() => setEditingId(null)}
                    isPending={isPending}
                  />
                </li>
              );
            }

            return (
              <li
                key={child.id}
                className={`flex items-center gap-3 rounded-xl border p-3 transition-colors ${
                  isActive
                    ? "border-orange-300 bg-orange-50/50"
                    : "border-stone-100 bg-stone-50/50"
                }`}
              >
                <span className="text-3xl" role="img" aria-label="Avatar">
                  {child.avatar_emoji}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-stone-800 flex items-center gap-2">
                    {child.display_name}
                    {isActive && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-bold tracking-wide text-orange-700">
                        <Check className="h-3 w-3" /> AKTIF
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-stone-400">
                    {child.age ? `${child.age} tahun` : "Usia belum diisi"}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  {!isActive && (
                    <button
                      onClick={() => handleSetActive(child.id)}
                      disabled={isPending}
                      className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 shadow-sm hover:bg-stone-50 disabled:opacity-50"
                    >
                      Pilih
                    </button>
                  )}
                  <button
                    onClick={() => setEditingId(child.id)}
                    disabled={isPending || isAdding || editingId !== null}
                    className="p-1.5 text-stone-400 hover:text-stone-600 disabled:opacity-50"
                    title="Edit profil"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteChild(child.id)}
                    disabled={isPending || isAdding || editingId !== null}
                    className="p-1.5 text-stone-400 hover:text-red-500 disabled:opacity-50"
                    title="Hapus profil"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        !isAdding && (
          <div className="rounded-xl bg-amber-50 px-4 py-6 text-center">
            <p className="text-2xl">👶</p>
            <p className="mt-2 text-sm font-medium text-stone-600">
              Belum ada profil anak
            </p>
            <p className="mt-1 text-xs text-stone-400">
              Tambahkan profil anak untuk mulai merekam progres belajarnya.
            </p>
          </div>
        )
      )}
    </div>
  );
}
