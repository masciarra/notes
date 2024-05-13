import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import NoteDetails from "@/components/NoteDetails";
import { Note } from "@/types/Note";

export default async function NotePage({
  params,
}: {
  params: { noteId: string };
}) {
  unstable_noStore();

  //Get note from DB on server side
  try {
    const {
      rows: [note],
    } =
      await sql`SELECT * FROM "public"."notes" WHERE "id" = ${params.noteId} ORDER BY "id" LIMIT 300 OFFSET 0`;
    return <NoteDetails note={note as Note} />;
  } catch {
    return <h1>Database error</h1>;
  }
}
