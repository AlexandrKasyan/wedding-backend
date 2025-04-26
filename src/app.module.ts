   // app.module.ts
   import { Module } from '@nestjs/common';
   import { TypeOrmModule } from '@nestjs/typeorm';
   import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuestsModule } from './guest/guests.module';
import { AuthModule } from './auth/auth.module';

   @Module({
     imports: [
       ConfigModule.forRoot({ isGlobal: true }), // Загрузка .env файла
       TypeOrmModule.forRoot({
         type: 'postgres',
         host: process.env.DATABASE_HOST,
         port: parseInt(process.env.DATABASE_PORT, 10),
         username: process.env.DATABASE_USERNAME,
         password: process.env.DATABASE_PASSWORD,
         database: process.env.DATABASE_NAME,
         entities: [__dirname + '/**/*.entity{.ts,.js}'],
         synchronize: false, // В production - false!
         autoLoadEntities: true,
       }),
       GuestsModule,
       AuthModule
     ],
     controllers: [AppController],
     providers: [AppService],
   })
   export class AppModule {}
