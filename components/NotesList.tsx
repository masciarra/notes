import { Note } from "@/types/Note";

export default function NotesList({ notes }: { notes: Note[] }) {
  return (
    <div className="w-[30rem]">
      <ul className="flex flex-col gap-4 list-disc">
        {notes.map((note) => {
          const noteText =
            note.content.length > 30
              ? `${note.content.substring(0, 30)}...`
              : note.content;
          return (
            <li className="ml-8" key={note.id}>
              <a
                className="flex gap-2 items-center hover:bg-gray-200 cursor-pointer p-2"
                href={`/notes/${note.id}`}
              >
                <span className="font-bold">Note {note.id}:</span>
                <p>{noteText}</p>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
