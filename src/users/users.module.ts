import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
   imports: [forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService,RolesGuard]
})
export class UsersModule {}
