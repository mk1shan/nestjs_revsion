import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards,  } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')

export class UsersController {



constructor(private readonly userService:UsersService){}

@Post()
create(@Body() createUserDto:CreateUserDto){
return this.userService.create(createUserDto);
}

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('ADMIN')
@Get()
findAll(){
    return this.userService.findAll();
}

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('ADMIN')
@Get(':id')
findOne(@Param('id') id:string){
return this.userService.findOne(id);
}

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('ADMIN')
@Patch(':id')
update (@Param('id') id: string, @Body() UpdateUserDto:UpdateUserDto){
    return this.userService.update(id,UpdateUserDto);
}

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('ADMIN')
@Delete(':id')
remove(@Param('id') id:string){
    return this.userService.remove(id);
}

}
