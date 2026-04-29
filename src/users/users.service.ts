import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {

constructor (private readonly prisma:PrismaService){}


async create(createUserDto: CreateUserDto){

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return await this.prisma.user.create({
        data: {
            ...createUserDto,
            password: hashedPassword, 
        },
    });
}


async findAll(){
    return await this.prisma.user.findMany();
}

async findOne(id:string){
    const user = await this.prisma.user.findUnique({
        where:{id},
    });

    if(!user){
        throw new NotFoundException('user not found');
    }
    

    return user;
}


async update (id:string,updateUserDto:UpdateUserDto){


await this.findOne(id);

return await this.prisma.user.update({
    where :{id},
    data: updateUserDto,
})




}

async remove(id:string){
    await this.findOne(id);

    return await this.prisma.user.delete({
        where:{id},
    })
}





async findByEmail(email:string){


    return this.prisma.user.findUnique({
        where:{email},
    })



}







}
