import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import configurations from '../../configurations';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from "../user/models/user.model";
import { UserModule } from "../user/user.module";
import { AuthModule } from "../auth/auth.module";
import { TokenModule } from "../token/token.module";

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('db_host'),
        port: configService.get('db_port'),
        password: configService.get('db_password'),
        username: configService.get('db_user'),
        database: configService.get('db_name'),
        synchronize: true,
        autoLoadModels: true,
        models: [User],
      }),
    }),
      UserModule,
      AuthModule,
      TokenModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
