import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: 
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Set options to optimize for serverless environment
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['error', 'warn'],
    // Connection limit is default set to 1 for better behavior in serverless
    // See: https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/connection-management
  });
};

export const prisma = globalForPrisma.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma; 