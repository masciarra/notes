import { Note } from "@/types/Note";
import Container from "./Container";
import DeleteButton from "./DeleteButton";
import NoteEditor from "./NoteEditor";

export default function NoteDetails({ note }: { note: Note }) {
  return (
    <Container className="flex flex-col items-center gap-4 relative w-[32rem] p-8">
      {!note ? (
        <h2>Note not found</h2>
      ) : (
        <>
          <h1>Note {note.id}</h1>
          <NoteEditor note={note} />
          <DeleteButton
            className="absolute bottom-8 right-8"
            noteId={note.id}
          />
        </>
      )}
    </Container>
  );
}
