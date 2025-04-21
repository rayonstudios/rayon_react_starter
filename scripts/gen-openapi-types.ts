#!/usr/bin/env tsx
import * as fs from "fs";
import * as http from "http";
import * as https from "https";
import openapiTS, { astToString } from "openapi-typescript";
import * as path from "path";
import ts from "typescript";
import { URL } from "url";

const DATE = ts.factory.createTypeReferenceNode(
  ts.factory.createIdentifier("Date")
); // `Date`
const FILE = ts.factory.createTypeReferenceNode(
  ts.factory.createIdentifier("File")
); // `Blob
const NULL = ts.factory.createLiteralTypeNode(ts.factory.createNull()); // `null`

// Get environment type from command line arguments
const envType = process.argv[2];

if (!envType) {
  console.error(
    "Usage: tsx gen-openapi-types.ts <environment_type> (development|production)"
  );
  process.exit(1);
}

const envFile = path.join(process.cwd(), `.env.${envType}`);

// Check if the environment file exists
if (!fs.existsSync(envFile)) {
  console.error(`Error: Environment file .env.${envType} does not exist`);
  process.exit(1);
}

// Read the environment file
const envContent = fs.readFileSync(envFile, "utf8");

// Extract API base URL from environment file
const apiBaseUrlMatch = envContent.match(/VITE_API_BASE_URL=(.+)/);
const apiBaseUrl = apiBaseUrlMatch ? apiBaseUrlMatch[1].trim() : null;

if (!apiBaseUrl) {
  console.error(`Error: VITE_API_BASE_URL not found in .env.${envType}`);
  process.exit(1);
}

console.log(`Using API base URL: ${apiBaseUrl}`);

// Fetch OpenAPI schema
const openApiUrl = `${apiBaseUrl}/openapi.json`;
console.log(`Fetching OpenAPI schema from: ${openApiUrl}`);

const tempFilePath = path.join(process.cwd(), "openapi.json");
const outputDir = path.join(process.cwd(), "src", "lib", "types");
const outputPath = path.join(outputDir, "openapi-fetch.d.ts");

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to download the OpenAPI schema
function downloadSchema(): Promise<void> {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(openApiUrl);
    const client = urlObj.protocol === "https:" ? https : http;

    const req = client.get(openApiUrl, (res) => {
      if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
        reject(new Error(`Failed to fetch OpenAPI schema: ${res.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(tempFilePath);
      res.pipe(fileStream);

      fileStream.on("finish", () => {
        fileStream.close();
        resolve();
      });
    });

    req.on("error", (error) => {
      reject(error);
    });
  });
}

// Main execution
async function main(): Promise<void> {
  try {
    // Download schema
    await downloadSchema();

    // Generate TypeScript types
    console.log("Generating TypeScript types");
    const openApiSchema = fs.readFileSync(tempFilePath, "utf8");
    const ast = await openapiTS(openApiSchema, {
      transform(schemaObject) {
        // handle date-time type
        if (schemaObject.format === "date-time") {
          return {
            schema: schemaObject.nullable
              ? ts.factory.createUnionTypeNode([DATE, NULL])
              : DATE,
            questionToken: true,
          };
        }

        // handle File type
        if (schemaObject.format === "binary") {
          return {
            schema: schemaObject.nullable
              ? ts.factory.createUnionTypeNode([FILE, NULL])
              : FILE,
            questionToken: true,
          };
        }
      },
    });
    const contents = astToString(ast);
    fs.writeFileSync(outputPath, contents);

    // Clean up
    fs.unlinkSync(tempFilePath);

    console.log(
      `TypeScript types successfully generated at src/lib/types/openapi-fetch.d.ts`
    );
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));

    // Clean up temp file if it exists
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }

    process.exit(1);
  }
}

main();
