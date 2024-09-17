/* eslint-disable prettier/prettier */
import { Controller , Body, Post , Get, Patch, Delete , Param , Req, HttpException, HttpStatus } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreDto } from './DTO/store.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UseGuards } from '@nestjs/common';
import { Request } from 'express';

@Controller('store')
// status(@Req() req:Request){
//     return req.user;
// }
export class StoreController {
    constructor(private storeService:StoreService){}

    @Post()
    @UseGuards(JwtAuthGuard)
    createStore(@Body() storeDto:StoreDto,@Req() req:Request){
        //console.log(storeDto)
        const id = req.user["id"];
        storeDto.createdby = id;
        return this.storeService.createStore(storeDto);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    FindAllStores(){
        try {
            return this.storeService.FindAllStores();
        } catch (error) {
            return error
        }
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findStore(@Param('id') id:string){
        return this.storeService.findStore(id);
    }
    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updateStore(@Param('id') id:string , @Body() storeDto:StoreDto,@Req() req:Request){
        const createdbyid = req.user["id"];
        const store = await this.storeService.findStore(id);
        if(store.createdby === createdbyid){
            return this.storeService.updateStore(id,storeDto);
        }
    }
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteStore(@Param('id') id:string,@Req() req:Request){
        const createdbyid = req.user["id"];
        const store = await this.storeService.findStore(id);
        if(store.createdby === createdbyid){
            return this.storeService.deleteStore(id);
        }
    }
}
