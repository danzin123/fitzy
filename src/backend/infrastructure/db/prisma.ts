import 'dotenv/config'; // <-- Garante a leitura da DATABASE_URL
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

// Cria o pool de conexão do Postgres lendo do arquivo .env
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// Instancia o PrismaClient injetando o adapter (Exigência do Prisma 7)
export const prisma = new PrismaClient({ adapter });