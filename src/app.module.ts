import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './libs/common/configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: config().database.url,
      }),
    }),
    UsersModule,
    AuthModule
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
