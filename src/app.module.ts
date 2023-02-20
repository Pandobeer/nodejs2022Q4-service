import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user/user.module';
import { ArtistModule } from './artists/artist/artist.module';
import { TrackModule } from './tracks/track/track.module';
import { AlbumsModule } from './albums/album/albums.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigService } from '@nestjs/config';
// import entities from './typeorm/index';
import { FavoritesModule } from './favorites/favorite/favorites.module';
import { dataSourceOptions } from './typeorm/typeorm.config';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumsModule,
    FavoritesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    // // TypeOrmModule.forRootAsync({
    // //   imports: [ConfigModule],
    // //   useFactory: (configService: ConfigService) => ({
    // //     type: 'postgres',
    // //     host: 'db',
    // //     port: configService.get<number>('POSTGRES_PORT'),
    // //     username: configService.get('POSTGRES_USER'),
    // //     password: configService.get('POSTGRES_PASSWORD'),
    // //     database: configService.get('POSTGRES_DB'),
    // //     entities: entities,
    // //     synchronize: true,
    // //   }),
    // //   inject: [ConfigService],
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
