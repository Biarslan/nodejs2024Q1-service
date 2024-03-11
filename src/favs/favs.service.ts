import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavsService {
  constructor(private readonly databaseService: DatabaseService) {}
  findAll() {
    const db = this.databaseService.getDB();
    const favs = db.favorites;
    const artistsId = favs.artists;
    const tracksId = favs.tracks;
    const albumsId = favs.albums;

    const artists = db.artists.filter((artist) =>
      artistsId.includes(artist.id),
    );
    const albums = db.albums.filter((album) => albumsId.includes(album.id));
    const tracks = db.tracks.filter((track) => tracksId.includes(track.id));

    return {
      artists,
      albums,
      tracks,
    };
  }
  addTrack(id: string) {
    const db = this.databaseService.getDB();
    const track = db.tracks.find((track) => track.id === id);
    if (track === undefined) return undefined;
    db.favorites.tracks.push(id);
    this.databaseService.updateDB(db);
    return true;
  }
  deleteTrack(id: string) {
    const db = this.databaseService.getDB();
    const track = db.tracks.find((track) => track.id === id);
    if (track === undefined) return undefined;
    const updatedFavTracks = db.favorites.tracks.filter(
      (track) => track !== id,
    );
    db.favorites.tracks = updatedFavTracks;
    this.databaseService.updateDB(db);
    return true;
  }

  addAlbum(id: string) {
    const db = this.databaseService.getDB();
    const album = db.albums.find((album) => album.id === id);
    if (album === undefined) return undefined;
    db.favorites.albums.push(id);
    this.databaseService.updateDB(db);
    return true;
  }
  deleteAlbum(id: string) {
    const db = this.databaseService.getDB();
    const album = db.albums.find((album) => album.id === id);
    if (album === undefined) return undefined;
    const updatedFavAlbums = db.favorites.albums.filter(
      (album) => album !== id,
    );
    db.favorites.albums = updatedFavAlbums;
    this.databaseService.updateDB(db);
    return true;
  }

  addArtist(id: string) {
    const db = this.databaseService.getDB();
    const artist = db.artists.find((artist) => artist.id === id);
    if (artist === undefined) return undefined;
    db.favorites.artists.push(id);
    this.databaseService.updateDB(db);
    return true;
  }
  deleteArtist(id: string) {
    const db = this.databaseService.getDB();
    const artist = db.artists.find((artist) => artist.id === id);
    if (artist === undefined) return undefined;
    const updatedFavArtists = db.favorites.artists.filter(
      (artist) => artist !== id,
    );
    db.favorites.artists = updatedFavArtists;
    this.databaseService.updateDB(db);
    return true;
  }
}
