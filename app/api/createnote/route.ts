import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  //Validate correct request body structure, then attempt DB insert
  if (reqBody.content) {
    const { content } = reqBody;
    if (!(content.length < 20 || content.length > 300)) {
      const res =
        await sql`INSERT INTO "public"."notes" ("content") VALUES (${content}) RETURNING id`;
      return NextResponse.json(
        {
          id: res.rows[0].id,
          message: `Successfully created note`,
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
      {
        message: "No content provided",
      },
      { status: 400 }
    );
  }
}
