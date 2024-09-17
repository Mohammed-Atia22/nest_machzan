/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from 'passport-local';
import { AuthService } from "../auth.service";
import { UserDto } from "../DTO/user.dto";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService:AuthService){
        super();
    }
    async validate(userDto:UserDto){
        const user = await this.authService.login(userDto);
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}

