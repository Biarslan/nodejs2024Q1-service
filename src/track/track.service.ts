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
    await this.databaseService.track.delete({ where: { id } });
    return true;
  }
}
