import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async findAll() {
    const favs = await this.databaseService.favorites.findFirst({
      select: {
        artists: { select: { id: true, name: true, grammy: true } },
        tracks: {
          select: {
            id: true,
            duration: true,
            name: true,
            artistId: true,
            albumId: true,
          },
        },
        albums: {
          select: { id: true, name: true, artistId: true, year: true },
        },
      },
    });

    return favs || (await this.databaseService.favorites.create({ data: {} }));
  }

  async addTrack(id: string) {
    const track = await this.databaseService.track.findUnique({
      where: { id },
    });
    if (track === null) return undefined;
    const favs =
      (await this.databaseService.favorites.findFirst()) ||
      (await this.databaseService.favorites.create({ data: {} }));

    return await this.databaseService.favorites.update({
      where: { id: favs.id },
      data: { tracks: { connect: { id } } },
    });
  }
  async deleteTrack(id: string) {
    const favs =
      (await this.databaseService.favorites.findFirst()) ||
      (await this.databaseService.favorites.create({ data: {} }));
    await this.databaseService.favorites.update({
      where: { id: favs.id },
      data: { tracks: { disconnect: { id } } },
      select: { tracks: true },
    });
    return true;
  }

  async addAlbum(id: string) {
    const album = await this.databaseService.album.findUnique({
      where: { id },
    });
    if (album === null) return undefined;
    const favs =
      (await this.databaseService.favorites.findFirst()) ||
      (await this.databaseService.favorites.create({ data: {} }));

    return await this.databaseService.favorites.update({
      where: { id: favs.id },
      data: { albums: { connect: { id } } },
    });
  }
  async deleteAlbum(id: string) {
    const favs =
      (await this.databaseService.favorites.findFirst()) ||
      (await this.databaseService.favorites.create({ data: {} }));
    await this.databaseService.favorites.update({
      where: { id: favs.id },
      data: { albums: { disconnect: { id } } },
      select: { albums: true },
    });
    return true;
  }

  async addArtist(id: string) {
    const artist = await this.databaseService.artist.findUnique({
      where: { id },
    });
    if (artist === null) return undefined;
    const favs =
      (await this.databaseService.favorites.findFirst()) ||
      (await this.databaseService.favorites.create({ data: {} }));

    return await this.databaseService.favorites.update({
      where: { id: favs.id },
      data: { artists: { connect: { id } } },
    });
  }
  async deleteArtist(id: string) {
    const favs =
      (await this.databaseService.favorites.findFirst()) ||
      (await this.databaseService.favorites.create({ data: {} }));
    await this.databaseService.favorites.update({
      where: { id: favs.id },
      data: { artists: { disconnect: { id } } },
      select: { artists: true },
    });
    return true;
  }
}
