import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function PATCH(req: NextRequest) {
  const reqBody = await req.json();

  //Validate request body structure, then attempt note content update in DB
  if (reqBody.id && reqBody.content) {
    const { id, content } = reqBody;
    if (!(content.length < 20 || content.length > 300)) {
      await sql`UPDATE "public"."notes" SET "content" = ${content} WHERE "id" = ${id}`;
      return NextResponse.json(
        {
          message: `Successfully updated note ${id}`,
        },
        {
          status: 200,
        }
      );
    } else {
      //Return error if incorrect content size provided
      return NextResponse.json(
        {
          message:
            "Invalid content provided.  Must not be less than 20 characters and not greater than 300 characters.",
        },
        { status: 400 }
      );
    }
  } else {
    //Return error if incorrect body structure provided
    return NextResponse.json(
      { message: "Missing id and/or content" },
      { status: 400 }
    );
  }
}
