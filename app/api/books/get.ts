import { ddbDocClient } from "@/lib/aws";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { NextResponse } from "next/server";

export async function GET() {
  const command = new ScanCommand({
    TableName: "Books",
  });

  try {
    const data = await ddbDocClient.send(command);
    return NextResponse.json(data.Items || []);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}