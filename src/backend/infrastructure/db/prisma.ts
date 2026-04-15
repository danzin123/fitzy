import pkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const { PrismaClient } = pkg;

// Configura o pool de conexão do PostgreSQL
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// Instancia o cliente usando o adapter (Padrão Prisma 7)
export const prisma = new PrismaClient({ adapter });