import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTrackDto } from 'src/dto/createTrack.dto';
import { UpdateTrackDto } from 'src/dto/updateTrack.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DatabaseService) {}
  findAll() {
    const db = this.databaseService.getDB();
    return db.tracks;
  }
  findOne(id: string) {
    const db = this.databaseService.getDB();
    const track = db.tracks.find((track) => track.id === id);
    if (track === undefined) return undefined;
    return track;
  }
  create(dto: CreateTrackDto) {
    const newTrack = {
      id: uuidv4(),
      name: dto.name,
      albumId: dto.albumId,
      artistId: dto.artistId,
      duration: dto.duration,
    };
    const db = this.databaseService.getDB();
    db.tracks.push({ ...newTrack });
    this.databaseService.updateDB(db);
    return newTrack;
  }
  update(id: string, dto: UpdateTrackDto) {
    const db = this.databaseService.getDB();
    const track = db.tracks.find((track) => track.id === id);
    if (track === undefined) return undefined;
    const updatedTrack = {
      ...track,
      ...dto,
    };
    const updatedTracks = db.tracks.filter((track) => track.id !== id);
    updatedTracks.push(updatedTrack);
    db.tracks = updatedTracks;
    this.databaseService.updateDB(db);
    return updatedTrack;
  }
  delete(id: string) {
    const db = this.databaseService.getDB();
    const track = db.tracks.find((track) => track.id === id);
    if (track === undefined) return undefined;
    const updatedTracks = db.tracks.filter((track) => track.id !== id);
    const updatedFavTracks = db.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
    db.favorites.tracks = updatedFavTracks;
    db.tracks = updatedTracks;
    this.databaseService.updateDB(db);
    return true;
  }
}
