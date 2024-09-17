/* eslint-disable prettier/prettier */
import { Prop , Schema , SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type StoreDocument = Store & Document;

@Schema()
export class Store{
    @Prop({required:true})
    name:string;

    @Prop({required:true})
    address:string;

    @Prop({required:true})
    usage:string;

    @Prop({required:true})
    area:number;

    @Prop({required:true})
    createdby:string;
}

export const StoreSchema = SchemaFactory.createForClass(Store);