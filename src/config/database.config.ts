import { registerAs } from '@nestjs/config';
import { join } from 'path';
const config = () => ({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [join(__dirname, '../**/**/*entity{.ts,.js}')],
  autoLoadEntities: true,

  //Migraciones
  migrationsRun: true,
  migrations: [join(__dirname, '../migration/**/*{.ts,.js}')],
  migrationsTableName: 'migrations_typeorm',
  cli: {
    migrationsDir: 'src/migration',
  },

  // 'synchronize' desactivar en produccion.
  synchronize: false,
  logging: true,
  logger: 'file',
});

export default registerAs('database', () => ({
  config: config(),
}));
