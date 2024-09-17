/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User,UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { UserDto } from './DTO/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel:Model<UserDocument> , private jwtService:JwtService){}

    async login(userDto:UserDto){
        try {
            if(!userDto.username||!userDto.email||!userDto.password){
                throw new HttpException(
                    'username and email and password are required',
                    HttpStatus.BAD_REQUEST,
                );
            }
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(userDto.password,salt);
            userDto.password = hash;
            const user = await this.userModel.create(userDto);
            const jwtuser = {id:user.id,name:user.username}
            return this.jwtService.signAsync(jwtuser);
            //return jwtuser
        } catch (error) {
            return error;
        }
    }
    async signup(id:string){
        try {
            return this.userModel.findById(id);
        } catch (error) {
            return error;
        }
    }
}
