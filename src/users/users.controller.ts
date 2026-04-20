import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {



constructor(private readonly userService:UsersService){}

@Post()
create(@Body() createUserDto:CreateUserDto){
return this.userService.create(createUserDto);
}


@Get()
findAll(){
    return this.userService.findAll();
}

@Get(':id')
findOne(@Param('id') id:string){
return this.userService.findOne(id);
}

@Patch(':id')
update (@Param('id') id: string, @Body() UpdateUserDto:UpdateUserDto){
    return this.userService.update(id,UpdateUserDto);
}
@Delete(':id')
remove(@Param('id') id:string){
    return this.userService.remove(id);
}

}
