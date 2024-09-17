/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {User,UserSchema} from './user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from './strateiges/local.strategy';
import { JwtStrategy } from './strateiges/jwt.strategy';
import { StoreModule } from 'src/store/store.module';

@Module({
  imports:[
    ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),
    PassportModule,
    JwtModule.register({
      secret:process.env.SECRET,
      signOptions:{expiresIn:'1h'},
    }),
    StoreModule,
  ],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {}
