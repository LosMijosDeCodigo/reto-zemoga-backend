import { registerAs } from '@nestjs/config';
const config = () => ({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  autoLoadEntities: true,

  //Migraciones
  migrationsRun: true,
  // migrations: [join(__dirname, '../migration/**/*{.ts,.js}')],
  migrations: ['dist/migration/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  cli: {
    migrationsDir: 'src/migration/',
  },

  // 'synchronize' desactivar en produccion.
  synchronize: true,
  logging: true,
  logger: 'file',
});

export default registerAs('database', () => ({
  config: config(),
}));
