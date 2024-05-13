import { unstable_noStore } from "next/cache";
import { sql } from "@vercel/postgres";
import Container from "@/components/Container";
import NoteCreator from "@/components/NoteCreator";
import NotesList from "@/components/NotesList";
import SearchInput from "@/components/SearchInput";
import { Note } from "@/types/Note";

export default async function Home() {
  //Bust NextJS cache
  unstable_noStore();

  //Get all notes from DB to render
  try {
    const { rows: notes } =
      await sql`SELECT * FROM "public"."notes" ORDER BY "id" DESC LIMIT 300 OFFSET 0`;

    return (
      <Container className="flex flex-col items-center gap-6 relative w-[44rem] p-8">
        <NoteCreator className="absolute top-6 left-2" />
        <SearchInput className="absolute right-2 top-6" />
        <h1>Notes</h1>
        <NotesList notes={notes as Note[]} />
      </Container>
    );
  } catch {
    return <h1>Database Error</h1>;
  }
}
