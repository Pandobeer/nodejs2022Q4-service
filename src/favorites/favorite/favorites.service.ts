import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import {
  FavoriteEntity,
  TrackEntity,
  AlbumEntity,
  ArtistEntity,
} from 'src/typeorm';
import { FavoritesResponseEntity } from './../entities/favorites-response.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private readonly favoritesRepository: Repository<FavoriteEntity>,
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  async initFavorites() {
    let favorites = (await this.favoritesRepository.find())[0];
    if (!favorites) {
      favorites = this.favoritesRepository.create({
        artistsIds: [],
        albumsIds: [],
        tracksIds: [],
      });
      favorites = await this.favoritesRepository.save(favorites);
    }
    return favorites;
  }

  async createFavTrack(id: string) {
    const favorites = await this.initFavorites();

    const favTrack = await this.trackRepository.findOneBy({ id });

    if (!favTrack) {
      throw new HttpException(
        `Track with provided id ${id} does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!favorites.tracksIds.includes(favTrack.id)) {
      favorites.tracksIds.push(favTrack.id);
      await this.favoritesRepository.save(favorites);
    }

    return `Track with id ${id} was successfully added to favourite tracks`;
  }

  async createFavAlbum(id: string) {
    const favorites = await this.initFavorites();
    const favAlbumsIds = favorites.albumsIds;

    const favAlbum = await this.albumRepository.findOneBy({ id });

    if (!favAlbum) {
      throw new HttpException(
        `Album with provided id does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (!favAlbumsIds.includes(favAlbum.id)) {
      favAlbumsIds.push(favAlbum.id);

      await this.favoritesRepository.update(favorites.id, {
        albumsIds: favAlbumsIds,
      });
    }

    return `Album with id ${id} was successfully added to favourite albums`;
  }

  async createFavArtist(id: string) {
    const favorites = await this.initFavorites();

    const favArtistsIds = favorites.artistsIds;

    const favArtist = await this.artistRepository.findOneBy({ id });

    if (!favArtist) {
      throw new HttpException(
        `Artist with provided id does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!favArtistsIds.includes(favArtist.id)) {
      favArtistsIds.push(favArtist.id);

      await this.favoritesRepository.update(favorites.id, {
        artistsIds: favArtistsIds,
      });
    }

    return `Artist with id ${id} was successfully added to favourite artists`;
  }

  async getAll() {
    const [favorite] = await this.favoritesRepository.find();

    const albums = await this.albumRepository.findBy({
      id: In(favorite.albumsIds),
    });

    const artists = await this.artistRepository.findBy({
      id: In(favorite.artistsIds),
    });

    const tracks = await this.trackRepository.findBy({
      id: In(favorite.tracksIds),
    });

    const allFavs = new FavoritesResponseEntity({
      tracks,
      albums,
      artists,
    });

    return allFavs;
  }

  async deleteTrack(trackIdToDel: string) {
    const favorites = await this.initFavorites();

    let favTracksIds = favorites.tracksIds;

    if (!favTracksIds.includes(trackIdToDel)) {
      throw new HttpException(
        `Track with provided id is not included in favorites`,
        HttpStatus.NOT_FOUND,
      );
    }

    favTracksIds = favTracksIds.filter((id) => id !== trackIdToDel);

    await this.favoritesRepository.update(favorites.id, {
      tracksIds: favTracksIds,
    });

    return `Album with id ${trackIdToDel} was successfully deleted from favourite albums`;
  }

  async deleteAlbum(albumIdToDel: string) {
    const favorites = await this.initFavorites();

    let favAlbumsIds = favorites.albumsIds;

    if (!favAlbumsIds.includes(albumIdToDel)) {
      throw new HttpException(
        `Album with provided id does not exist in favorites`,
        HttpStatus.NOT_FOUND,
      );
    }
    favAlbumsIds = favAlbumsIds.filter((id) => id !== albumIdToDel);

    await this.favoritesRepository.update(favorites.id, {
      albumsIds: favAlbumsIds,
    });

    return `Album with id ${albumIdToDel} was successfully deleted from favourite albums`;
  }

  async deleteArtist(artistIdToDel: string) {
    const favorites = await this.initFavorites();

    let favArtistsIds = favorites.artistsIds;

    if (!favArtistsIds.includes(artistIdToDel)) {
      throw new HttpException(
        `Artist with provided id is not included in favorites`,
        HttpStatus.NOT_FOUND,
      );
    }

    favArtistsIds = favArtistsIds.filter(
      (id) => id !== artistIdToDel || id === null,
    );

    await this.favoritesRepository.update(favorites.id, {
      artistsIds: favArtistsIds,
    });

    return `Artist with id ${artistIdToDel} was successfully deleted from favourite albums`;
  }
}
