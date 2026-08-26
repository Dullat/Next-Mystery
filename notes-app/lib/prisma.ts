import { PrismaClient } from '@prisma/client';

// 1. Declare the global TypeScript interface
// This tells TypeScript that `globalThis` might have a prisma property attached.
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

// 2. Instantiate the Client
// If globalForPrisma.prisma exists, use it. Otherwise, create a new connection.
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// 3. Preserve the connection in development
// In production (NODE_ENV === 'production'), Next.js doesn't hot-reload, so we don't need this.
// In development, we attach the connection to the global object so it survives saves.
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
