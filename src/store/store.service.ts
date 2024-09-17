/* eslint-disable prettier/prettier */
import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Store,StoreDocument } from './Store.schema';
import { Model } from 'mongoose';
import { StoreDto } from './DTO/store.dto';

@Injectable()
export class StoreService {
    constructor(@InjectModel(Store.name) private StoreModel:Model<StoreDocument>){}

    async createStore(storeDto:StoreDto){
        try {
            return this.StoreModel.create(storeDto);
        } catch (error) {
            return error;
        }
    }
    async FindAllStores(){
        try {
            return this.StoreModel.find();
        } catch (error) {
            return error;
        }
    }
    async findStore(id:string){
        try {
            const store = await this.StoreModel.findById(id);
            return store;
        } catch (error) {
            return error;
        }
    }
    async updateStore(id:string,storeDto:StoreDto){
        try {
            const store = await this.StoreModel.findByIdAndUpdate(id,storeDto,{new:true});
            return store;
        } catch (error) {
            return error;
        }
    }
    async deleteStore(id:string){
        try {
            return this.StoreModel.findByIdAndDelete(id);
        } catch (error) {
            return error;
        }
    }
}
