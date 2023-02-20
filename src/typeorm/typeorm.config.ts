import { DataSource } from "typeorm";
import entities from '.';

import * as dotenv from 'dotenv';
import { registerAs } from "@nestjs/config";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

dotenv.config();

export const configOptions: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    username: process.env.POSTGRES_USER,
    entities: entities,
    migrationsTableName: 'migrations',
    synchronize: true,
    // migrationsRun: true,
    migrations: ['dist/typeorm/migrations/*{.ts,.js}'],
    parseInt8: true,
    logging: true,
};

const dataSource = new DataSource(configOptions);
export default dataSource;

export const pgdb = registerAs(
    'pgdb',
    (): PostgresConnectionOptions => configOptions,
);