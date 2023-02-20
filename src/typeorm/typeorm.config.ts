// import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import entities from '.';

import { config } from 'dotenv';

config();

// export const dataSourceOptions = {
//     imports: [ConfigModule.forRoot({ load: [database] })],
//     useFactory: async (configService: ConfigService) => configService.get('database'),
//     dataSourceFactory: async (options: DataSourceOptions) => new DataSource(options).initialize(),
//     inject: [ConfigService],
// };

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    username: process.env.POSTGRES_USER,
    entities: entities,
    migrationsTableName: 'migrations',
    synchronize: false,
    migrationsRun: true,
    migrations: ['dist/typeorm/migrations/*{.ts,.js}'],
    // cli: { migrationsDir: 'src/typeorm/migrations' },
    parseInt8: true,
    logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

    // export const database = registerAs(
    //     'database',
    //     (): PostgresConnectionOptions => config,
    //   );