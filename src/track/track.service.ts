import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTrackDto } from 'src/dto/createTrack.dto';
import { UpdateTrackDto } from 'src/dto/updateTrack.dto';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DatabaseService) {}
  async findAll() {
    const tracks = await this.databaseService.track.findMany();
    return tracks;
  }
  async findOne(id: string) {
    const track = await this.databaseService.track.findUnique({
      where: { id },
    });
    if (track === null) return undefined;
    return track;
  }
  async create(dto: CreateTrackDto) {
    const newTrack = await this.databaseService.track.create({ data: dto });
    return newTrack;
  }
  async update(id: string, dto: UpdateTrackDto) {
    const track = await this.databaseService.track.findUnique({
      where: { id },
    });

    if (track === null) return undefined;
    const updatedTrack = await this.databaseService.track.update({
      where: { id },
      data: dto,
    });
    return updatedTrack;
  }
  async delete(id: string) {
    const track = await this.databaseService.track.findUnique({
      where: { id },
    });
    if (track === null) return undefined;
    // const updatedTracks = db.tracks.filter((track) => track.id !== id);
    // const updatedTracks = db.tracks.map((track) => {
    //   return track.trackId === id ? { ...track, trackId: null } : track;
    // });
    // const updatedFavTrack = db.favorites.tracks.filter(
    //   (trackId) => trackId !== id,
    // );
    // db.favorites.tracks = updatedFavTrack;
    // db.tracks = updatedTracks;
    // db.tracks = updatedTracks;
    await this.databaseService.track.delete({ where: { id } });
    return true;
  }
}
