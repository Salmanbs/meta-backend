import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'
import * as passport from 'passport'
import { AppConfigTypes } from './libs/common/configs';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const appConfig: AppConfigTypes =
    app.get<ConfigService>(ConfigService)['internalConfig']['config'];
    const { secrets,  } = appConfig;
  app.use(
    session({
      secret: secrets.key,
      resave: false,
      saveUninitialized: false,
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(3001);
}
bootstrap();
