import { ddbDocClient } from "@/lib/aws";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const command = new PutCommand({
    TableName: "Books",
    Item: body,
  });

  try {
    await ddbDocClient.send(command);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to add book" }, { status: 500 });
  }
}