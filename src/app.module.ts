import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigService } from '@nestjs/config';
// import { pgdb, configOptions } from './typeorm/typeorm.config';
// import { DataSource, DataSourceOptions } from 'typeorm';
import { APP_FILTER } from '@nestjs/core';

import { UserModule } from './users/user/user.module';
import { ArtistModule } from './artists/artist/artist.module';
import { TrackModule } from './tracks/track/track.module';
import { AlbumsModule } from './albums/album/albums.module';
import { FavoritesModule } from './favorites/favorite/favorites.module';
import { LoggerMidleware } from './logger/logger.middleware';
import { LoggerModule } from './logger/logger.module';
import { CustomExceptionFilter } from './exception-filter/exception.filter';
// import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './auth/auth.module';
import dataSource, { configOptions } from './typeorm/typeorm.config';
import { DataSource } from 'typeorm';

// const typeOrmConfigOptions = {
//   imports: [ConfigModule.forRoot({ load: [pgdb] })],
//   useFactory: async (configService: ConfigService) => configService.get('pgdb'),
//   dataSourceFactory: async (options: DataSourceOptions) =>
//     new DataSource(options).initialize(),
//   inject: [ConfigService],
// };

@Module({
  imports: [
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumsModule,
    FavoritesModule,
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true }),
    // TypeOrmModule.forRootAsync(typeOrmConfigOptions),
    TypeOrmModule.forRoot(configOptions),

    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) { }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMidleware).forRoutes('*');
  }
}
