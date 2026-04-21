import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // This makes PrismaService available everywhere without repeating imports
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
