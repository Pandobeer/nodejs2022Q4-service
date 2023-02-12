// import { Injectable } from '@nestjs/common';
// import { ArtistEntity } from 'src/artists/entities/artist.entity';
// import { v4 as uuidv4 } from 'uuid';
// import { CreateArtistDto } from '../dto/create-artist.dto';
// import { UpdateArtistDto } from '../dto/update-artist.dto';
// import { ArtistsStore } from '../interfaces/artist-storage.interface';

// @Injectable()
// class InMemoryArtistsStorage implements ArtistsStore {
//   private artists: ArtistEntity[] = [];

//   getAll() {
//     return this.artists;
//   }

//   create(createArtistDto: CreateArtistDto): ArtistEntity {
//     const newArtist = {
//       ...createArtistDto,
//       id: uuidv4(),
//     };
//     this.artists.push(newArtist);

//     return newArtist;
//   }

//   findById(id: string): ArtistEntity | undefined {
//     const artist = this.artists.find((artist) => artist.id === id);
//     return artist;
//   }

//   update(id: string, updateArtistDto: UpdateArtistDto): ArtistEntity {
//     const artistToUpdate = this.artists.find((artist) => artist.id === id);
//     const indexOfArtistToUpdate = this.artists.indexOf(artistToUpdate);

//     const updatedArtist = {
//       ...artistToUpdate,
//       ...updateArtistDto,
//     };

//     this.artists.splice(indexOfArtistToUpdate, 1, updatedArtist);

//     return updatedArtist;
//   }

//   delete(id: string): void {
//     const indexOfArtistToDelete = this.artists.findIndex(
//       (artist) => artist.id === id,
//     );

//     this.artists.splice(indexOfArtistToDelete, 1);
//   }
// }

// export default InMemoryArtistsStorage;
