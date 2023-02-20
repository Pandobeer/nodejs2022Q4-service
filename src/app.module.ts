import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user/user.module';
import { ArtistModule } from './artists/artist/artist.module';
import { TrackModule } from './tracks/track/track.module';
import { AlbumsModule } from './albums/album/albums.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { FavoritesModule } from './favorites/favorite/favorites.module';
import { pgdb } from './typeorm/typeorm.config';
import { DataSource, DataSourceOptions } from 'typeorm';

const typeOrmConfigOptions = {
  imports: [ConfigModule.forRoot({ load: [pgdb] })],
  useFactory: async (configService: ConfigService) =>
    configService.get('pgdb'),
  dataSourceFactory: async (options: DataSourceOptions) =>
    new DataSource(options).initialize(),
  inject: [ConfigService],
};

@Module({
  imports: [
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumsModule,
    FavoritesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfigOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
