import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
// Import from your custom output path!
import { PrismaClient } from '../generated/prisma/client'; 

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);

    super({ adapter }); // This tells Prisma 7 how to talk to Postgres
  }

  async onModuleInit() {
    await this.$connect();
  }
}
