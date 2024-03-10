import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AlbumDto } from 'src/dto/album.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  constructor(private readonly databaseService: DatabaseService) {}
  findAll() {
    const db = this.databaseService.getDB();
    return db.albums;
  }
  findOne(id: string) {
    const db = this.databaseService.getDB();
    const album = db.albums.find((album) => album.id === id);
    if (album === undefined) return undefined;
    return album;
  }
  create(dto: AlbumDto) {
    const newAlbum = {
      id: uuidv4(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId,
    };
    const db = this.databaseService.getDB();
    db.albums.push({ ...newAlbum });
    this.databaseService.updateDB(db);
    return newAlbum;
  }
  update(id: string, dto: AlbumDto) {
    const db = this.databaseService.getDB();
    const album = db.albums.find((album) => album.id === id);
    if (album === undefined) return undefined;
    const updatedAlbum = {
      ...album,
      ...dto,
    };
    const updatedAlbums = db.albums.filter((album) => album.id !== id);
    updatedAlbums.push(updatedAlbum);
    db.albums = updatedAlbums;
    this.databaseService.updateDB(db);
    return updatedAlbum;
  }
  delete(id: string) {
    const db = this.databaseService.getDB();
    const album = db.albums.find((album) => album.id === id);
    if (album === undefined) return undefined;
    const updatedAlbums = db.albums.filter((album) => album.id !== id);
    const updatedTracks = db.tracks.map((track) => {
      return track.albumId === id ? { ...track, albumId: null } : track;
    });
    db.albums = updatedAlbums;
    db.tracks = updatedTracks;
    this.databaseService.updateDB(db);
    return true;
  }
}
