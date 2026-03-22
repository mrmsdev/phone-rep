import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../lib/prisma-client/client'

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/phonerepair?schema=public'

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

export const prisma = new PrismaClient({ adapter })
