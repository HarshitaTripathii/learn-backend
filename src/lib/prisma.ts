// lib/prisma.ts
// Prisma v7 (Postgres) helper with @prisma/adapter-pg + pg Pool and singleton pattern.

import "dotenv/config"; // load .env explicitly for Prisma v7 runtime
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Import PrismaClient from the generated client output.
// Adjust this path to match the `output` you set in schema.prisma generator.
import { PrismaClient } from "../generated/prisma/client";

type GlobalForPrisma = {
  prisma?: PrismaClient;
  _prismaPool?: Pool;
};

const globalForPrisma = globalThis as unknown as GlobalForPrisma;

// Build a pg Pool using DATABASE_URL (you can tune pool options here)
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL must be set in environment");
}

const pool =
  globalForPrisma._prismaPool ??
  new Pool({
    connectionString,
    // Optional: tune pool settings (connectionLimit -> connectionLimit param
    // in connection string is also supported). Example:
    // max: Number(process.env.PG_POOL_MAX) || 10,
    // idleTimeoutMillis: 10000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma._prismaPool = pool;
}

// Create the PrismaPg adapter. You may pass ssl or other pg Pool options here.
const adapter = new PrismaPg(pool);

// Create or reuse PrismaClient instance. Keep a single instance during dev.
const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    // optional: enable logging in development
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "info", "warn", "error"]
        : ["warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
export { pool };