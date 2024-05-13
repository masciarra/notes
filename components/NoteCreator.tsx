"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Container from "./Container";

export default function NoteCreator({ className }: { className?: string }) {
  const [noteInput, setNoteInput] = useState("");
  const [validation, setValidation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  async function handleCreate() {
    if (!noteInput || noteInput.length < 20 || noteInput.length > 300) {
      setValidation(true);
    } else {
      setValidation(false);
      try {
        setLoading(true);
        await axios.post("/api/createnote", { content: noteInput });
        setNoteInput("");
        setLoading(false);
        router.refresh();
      } catch {
        setLoading(false);
      }
    }
  }

  return (
    <>
      {isVisible ? (
        <Container className="absolute -left-56 top-0 w-[210px] flex flex-col items-center gap-4 p-4">
          <h3>Note Creator</h3>
          <textarea
            className="w-full border border-black p-1.5 min-h-36"
            onChange={(e) => {
              setNoteInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreate();
              }
            }}
            value={noteInput}
          />
          <button
            className="border p-2 rounded-lg bg-gray-300 hover:bg-gray-200 flex items-center justify-center"
            disabled={loading}
            onClick={handleCreate}
          >
            {loading ? <>Loading...</> : <>Create Note</>}
          </button>
          {validation ? (
            <p className="text-red-400">
              Invalid note. Must not be less than 20 characters and not greater
              than 300 characters.
            </p>
          ) : null}
        </Container>
      ) : null}
      <div className="fixed top-0 left-0 w-full h-full bg-gray-400 opacity-80 z-10 flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg w-[44rem]">content</div>
      </div>
      <div className={className}>
        <button
          className="border p-2 rounded-lg bg-gray-300 hover:bg-gray-200 flex items-center justify-center"
          disabled={loading}
          onClick={() => {
            setIsVisible((current) => {
              return !current;
            });
          }}
        >
          {isVisible ? <>Hide Creator</> : <>Create</>}
        </button>
      </div>
    </>
  );
}
