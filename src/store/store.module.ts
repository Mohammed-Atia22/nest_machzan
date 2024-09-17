/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import {Store,StoreSchema} from './Store.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name:Store.name,schema:StoreSchema}])],
  providers: [StoreService],
  controllers: [StoreController],
})
export class StoreModule {}
