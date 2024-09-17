/* eslint-disable prettier/prettier */
import { Prop , Schema , SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type StoreDocument = Store & Document;

@Schema()
export class Store{
    @Prop()
    name:string;

    @Prop()
    address:string;

    @Prop()
    usage:string;

    @Prop()
    area:number;

    @Prop()
    createdby:string;
}

export const StoreSchema = SchemaFactory.createForClass(Store);