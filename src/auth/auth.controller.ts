/* eslint-disable prettier/prettier */
import { Controller,Post , Get, UseGuards, Req } from '@nestjs/common';
import {AuthService} from './auth.service'
import { UserDto } from './DTO/user.dto';
import { Body } from '@nestjs/common';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Request } from 'express';


@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post()
    @UseGuards(LocalGuard)
    // login(@Req() req:Request){
    //     return req.user;
    // }
    login(@Body() userDto:UserDto){
        return this.authService.login(userDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    status(@Req() req:Request){
        return req.user;
    }
    // @Get(':id')
    // signup(@Param('id') id:string){
    //     return this.authService.signup(id);
    // }
}
