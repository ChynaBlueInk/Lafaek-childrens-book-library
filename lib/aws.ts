// lib/aws.ts
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const REGION = "ap-southeast-2";

const client = new DynamoDBClient({ region: REGION });
export const ddbDocClient = DynamoDBDocumentClient.from(client);

