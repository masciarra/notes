"use client";

import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export default function DeleteButton({
  className,
  noteId,
}: {
  className?: string;
  noteId: string;
}) {
  const router = useRouter();
  async function handleDelete() {
    try {
      await axios.delete(`/api/deletenote/${noteId}`);
      router.replace("/");
    } catch {}
  }

  return (
    <button
      className={clsx(className, "bg-red-300 hover:bg-red-400 rounded-lg p-4")}
      onClick={handleDelete}
    >
      Delete
    </button>
  );
}
