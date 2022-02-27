import { PrismaClient } from '@prisma/client';

declare global {
	var prisma: PrismaClient | undefined;
}

// Globalize the prisma client so it doesn't create too many connections:
// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices#problem
export const prisma =
	global.prisma ||
	new PrismaClient({
		log: ['query'],
	});

if (process.env.NODE_ENV !== 'production') {
	global.prisma = prisma;
}
