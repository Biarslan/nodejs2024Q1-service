import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AlbumDto } from 'src/dto/album.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly databaseService: DatabaseService) {}
  async findAll() {
    const albums = await this.databaseService.album.findMany();
    return albums;
  }
  async findOne(id: string) {
    const album = await this.databaseService.album.findUnique({
      where: { id },
    });
    if (album === null) return undefined;
    return album;
  }
  async create(dto: AlbumDto) {
    const newAlbum = await this.databaseService.album.create({ data: dto });
    return newAlbum;
  }
  async update(id: string, dto: AlbumDto) {
    const album = await this.databaseService.album.findUnique({
      where: { id },
    });

    if (album === null) return undefined;
    const updatedAlbum = await this.databaseService.album.update({
      where: { id },
      data: dto,
    });
    return updatedAlbum;
  }
  async delete(id: string) {
    const album = await this.databaseService.album.findUnique({
      where: { id },
    });
    if (album === null) return undefined;
    await this.databaseService.album.delete({ where: { id } });
    return true;
  }
}
