import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ArtistDto } from 'src/dto/artist.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistService {
  constructor(private readonly databaseService: DatabaseService) {}
  findAll() {
    const db = this.databaseService.getDB();
    return db.artists;
  }
  findOne(id: string) {
    const db = this.databaseService.getDB();
    const artist = db.artists.find((artist) => artist.id === id);
    if (artist === undefined) return undefined;
    return artist;
  }
  create(dto: ArtistDto) {
    const newArtist = {
      id: uuidv4(),
      name: dto.name,
      grammy: dto.grammy,
    };
    const db = this.databaseService.getDB();
    db.artists.push({ ...newArtist });
    this.databaseService.updateDB(db);
    return newArtist;
  }
  update(id: string, dto: ArtistDto) {
    const db = this.databaseService.getDB();
    const artist = db.artists.find((artist) => artist.id === id);
    if (artist === undefined) return undefined;
    const updatedArtist = {
      ...artist,
      ...dto,
    };
    const updatedArtists = db.artists.filter((artist) => artist.id !== id);
    updatedArtists.push(updatedArtist);
    db.artists = updatedArtists;
    this.databaseService.updateDB(db);
    return updatedArtist;
  }
  delete(id: string) {
    const db = this.databaseService.getDB();
    const artist = db.artists.find((artist) => artist.id === id);
    if (artist === undefined) return undefined;
    const updatedArtists = db.artists.filter((artist) => artist.id !== id);
    const updatedTracks = db.tracks.map((track) => {
      return track.artistId === id ? { ...track, artistId: null } : track;
    });
    const updatedAlbums = db.albums.map((album) => {
      return album.artistId === id ? { ...album, artistId: null } : album;
    });
    const updatedFavArtist = db.favorites.artists.filter(
      (artistId) => artistId !== id,
    );
    db.favorites.tracks = updatedFavArtist;
    db.artists = updatedArtists;
    db.tracks = updatedTracks;
    db.albums = updatedAlbums;
    this.databaseService.updateDB(db);
    return true;
  }
}
