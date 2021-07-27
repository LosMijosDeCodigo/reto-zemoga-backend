import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpireIn: process.env.TIME_EXPIRE_TOKEN,
  };
});
