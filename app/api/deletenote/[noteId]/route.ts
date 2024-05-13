import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { noteId: string } }
) {
  //Delete note with noteId from DB
  await sql`DELETE FROM "public"."notes" WHERE "id" = ${params.noteId}`;
  return NextResponse.json(
    {
      message: `Successfully deleted note ${params.noteId}`,
    },
    {
      status: 200,
    }
  );
}
