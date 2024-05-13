import { unstable_noStore } from "next/cache";
import { sql } from "@vercel/postgres";
import Container from "@/components/Container";
import NotesList from "@/components/NotesList";
import SearchInput from "@/components/SearchInput";
import { Note } from "@/types/Note";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  //bust NextJS DB cache
  unstable_noStore();

  //Get notes that match query from DB
  try {
    const { rows: notes } =
      await sql`SELECT * FROM "public"."notes" WHERE "content"::TEXT ILIKE '%'||${searchParams.query}||'%' ORDER BY "id" LIMIT 300 OFFSET 0`;

    return (
      <Container className="flex flex-col gap-4 w-[40rem] relative p-8">
        <div className="flex justify-between">
          <h1>Search Results for {`"${searchParams.query}"`}</h1>
          <SearchInput />
        </div>
        <NotesList notes={notes as Note[]} />
      </Container>
    );
  } catch {
    return <h1>Database error</h1>;
  }
}
