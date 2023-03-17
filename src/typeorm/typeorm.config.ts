import { DataSource, DataSourceOptions } from 'typeorm';
// import entities from '.';
import entities from './index';

import * as dotenv from 'dotenv';
// import { registerAs } from '@nestjs/config';
// import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

dotenv.config();

export const configOptions: DataSourceOptions = {
  type: 'postgres',
  // host: process.env.POSTGRES_HOST,
  host: 'localhost',
  // host: 'db',

  port: +process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  username: process.env.POSTGRES_USER,
  // entities: [UserEntity, ArtistEntity, AlbumEntity, TrackEntity, FavoriteEntity],
  entities: entities,
  logging: true,
  migrationsTableName: 'migrations',
  synchronize: false,
  migrations: ['dist/typeorm/migrations/*{.ts,.js}'],
  // migrations: [__dirname + 'migrations2/*{.ts,.js}'],
  parseInt8: true,
};

const dataSource = new DataSource(configOptions);
export default dataSource;

// export const pgdb = registerAs(
//   'pgdb',
//   (): PostgresConnectionOptions => configOptions,
// );
