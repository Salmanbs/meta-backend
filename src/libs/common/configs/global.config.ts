import { registerAs } from '@nestjs/config';
import { AppConfigTypes } from './types';

export default registerAs(
  'config',
  (): AppConfigTypes => ({
    database: {
        url: process.env.MONGODB_URI,
      },
    secrets:{
      key: process.env.SECRET_KEY,
    }
  }),
);
