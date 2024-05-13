"use client";

import axios from "axios";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Note } from "@/types/Note";

export default function NoteEditor({ note }: { note: Note }) {
  const [noteInput, setNoteInput] = useState(note.content);
  const [saved, setSaved] = useState(true);
  const [validation, setValidation] = useState(false);

  async function handleSave() {
    if (!noteInput || noteInput.length < 20 || noteInput.length > 300) {
      setValidation(true);
    } else {
      try {
        setValidation(false);
        const res = await axios.patch("/api/updatenote", {
          id: note.id,
          content: noteInput,
        });
        setSaved(true);
      } catch {
        setSaved(false);
      }
    }
  }

  useEffect(
    function updateSaved() {
      if (noteInput !== note.content) {
        setSaved(false);
      } else {
        setSaved(true);
        setValidation(false);
      }
    },
    [noteInput, note.content]
  );

  return (
    <div className="flex flex-col w-full gap-4">
      <textarea
        className="border border-black w-full h-80 leading-5 p-1"
        onChange={(e) => {
          setNoteInput(e.target.value);
        }}
        value={noteInput}
      />
      {validation ? (
        <p className="text-red-400">
          Invalid note. Must not be less than 20 characters and not greater than
          300 characters.
        </p>
      ) : null}
      <button
        className={clsx(
          "flex justify-center items-center rounded-lg p-4 w-24",
          saved
            ? "bg-blue-100 hover:bg-blue-100 cursor-default"
            : "bg-blue-300 hover:bg-blue-400"
        )}
        disabled={saved}
        onClick={handleSave}
      >
        {saved ? <>Saved ✓</> : <>Save</>}
      </button>
    </div>
  );
}
