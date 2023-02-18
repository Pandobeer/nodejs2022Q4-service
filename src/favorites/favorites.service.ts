import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { FavoriteEntity, TrackEntity, AlbumEntity, ArtistEntity } from 'src/typeorm';
import { defaultFavorites } from './constants';

@Injectable()
export class FavoritesService {

  constructor(
    @InjectRepository(FavoriteEntity) private readonly favoritesRepository: Repository<FavoriteEntity>,
    @InjectRepository(TrackEntity) private readonly trackRepository: Repository<TrackEntity>,
    @InjectRepository(AlbumEntity) private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity) private readonly artistRepository: Repository<ArtistEntity>,
    // @InjectRepository(FavoritesResponseEntity) private readonly favoritesResponseRepository: Repository<FavoritesResponseEntity>
  ) { }

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
      // await this.favoritesRepository.save(favorites);
      await this.favoritesRepository.update(favorites.id, { tracksIds: favorites.tracksIds });
    }

    console.log(1, favorites.tracksIds, 'favorites.tracksIds', favorites, 'favorites');

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

      await this.favoritesRepository.update(favorites.id, { albumsIds: favAlbumsIds });
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

      await this.favoritesRepository.update(favorites.id, { artistsIds: favArtistsIds });
    }

    return `Artist with id ${id} was successfully added to favourite artists`;
  }

  async getAll() {

    // const favorite = new FavoriteEntity();
    const favorites = await this.favoritesRepository.find({
      // relations: {
      //   tracksIds: true,
      // }
    });
    console.log(5, favorites, 'favorites');

    // let favTrackIds = favorites.tracksIds;
    // console.log(6, favTrackIds, 'ids');

    // let favTracks = await this.trackRepository.find(
    //   {
    //     // where: favTrackIds.map((id) => ({ id })),
    //     where: { id: In(favTrackIds), }
    //   });
    // // const [allTracks] = await this.trackRepository.find({});

    // if (!favTracks) {
    //   favTracks = [];
    // }
    // // if (!favTrackIds) {
    // //   return { favTrackIds: [] };
    // // }
    // const favorites = await this.favoritesRepository.find();

    // // const trackIds = favorites.flatMap((favorite) => favorite.tracksIds);


    // if (!favTrackIds) {
    //   return { favTrackIds: [] };
    // }
    // const [tracks] = await Promise.all(
    //   favorites.tracks.map((favTrackIds) => this.trackRepository.findBy({ id: favTrackIds }))
    // );



    // const favoriteTracks = favorites.reduce((acc, fav) => [...acc, ...fav.tracks], []);
    // const favoriteAlbums = favorites.reduce((acc, fav) => [...acc, ...fav.albums], []);
    // const favoriteArtists = favorites.reduce((acc, fav) => [...acc, ...fav.artists], []);
    // console.log(favorites, 'this.favorites', favoriteTracks, 'favTr');

    return {
      // favTracks,
      // favoriteAlbums,
      // favoriteArtists
    };

    // const allArtists = await this.artistService.getAllArtists();
    // const allAlbums = await this.albumsService.getAllAlbums();
    // const allTracks = await this.trackRepository.find({ relations: ['tracks'] });
    // const favorites = this.favoritesService.getAll();

    // const favoritesAll = {
    //   artists: allArtists.filter((artist) =>
    //     favorites.artists.includes(artist.id),
    //   ),
    //   albums: allAlbums.filter((album) => favorites.albums.includes(album.id)),
    //   tracks: allTracks.filter((track) => favorites.tracks.includes(track.id)),
    // };

    // return favoritesAll;
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
    favTracksIds = favTracksIds.filter(id => id !== trackIdToDel);

    await this.favoritesRepository.update(favorites.id, { tracksIds: favTracksIds });

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
    favAlbumsIds = favAlbumsIds.filter(id => id !== albumIdToDel);

    await this.favoritesRepository.update(favorites.id, { albumsIds: favAlbumsIds });

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
    // this.favoritesRepository.deleteTrack(trackId);

    favArtistsIds = favArtistsIds.filter(id => id !== artistIdToDel);

    await this.favoritesRepository.update(favorites.id, { artistsIds: favArtistsIds });

    return `Album with id ${artistIdToDel} was successfully deleted from favourite albums`;
  }

  // findArtistById(artistId: string) {
  //   return this.favoritesRepository.findArtistById(artistId);
  // }

  // findAlbumById(albumId: string) {
  //   return this.favoritesRepository.findAlbumById(albumId);
  // }

  // findTrackById(id: string): string | undefined {

  //   const favTrackId = this.favorites.tracks.find((trackId) => trackId === id);
  //   return favTrackId;
  // }
}
