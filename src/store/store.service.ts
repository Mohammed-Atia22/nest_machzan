/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Store,StoreDocument } from './Store.schema';
import { Model } from 'mongoose';
import { StoreDto } from './DTO/store.dto';

@Injectable()
export class StoreService {
    constructor(@InjectModel(Store.name) private StoreModel:Model<StoreDocument>){}

    async createStore(storeDto:StoreDto){
        return this.StoreModel.create(storeDto);
    }
    async FindAllStores(){
        return this.StoreModel.find();
    }
    async findStore(id:string){
        const store = await this.StoreModel.findById(id);
        return store;
    }
    async updateStore(id:string,storeDto:StoreDto){
        const store = await this.StoreModel.findByIdAndUpdate(id,storeDto,{new:true});
        return store;
    }
    async deleteStore(id:string){
        return this.StoreModel.findByIdAndDelete(id);
    }
}
