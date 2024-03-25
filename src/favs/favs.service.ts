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

  async getFavs() {
    return (
      (await this.databaseService.favorites.findFirst()) ||
      (await this.databaseService.favorites.create({ data: {} }))
    );
  }

  async isExist(type: 'track' | 'artist' | 'album', id: string) {
    switch (type) {
      case 'track':
        return await this.databaseService.track.findUnique({ where: { id } });
      case 'artist':
        return await this.databaseService.artist.findUnique({ where: { id } });
      case 'album':
        return await this.databaseService.album.findUnique({ where: { id } });
      default:
        return null;
    }
  }

  async addTrack(id: string) {
    if (!(await this.isExist('track', id))) return undefined;
    const favs = await this.getFavs();
    return await this.databaseService.favorites.update({
      where: { id: favs.id },
      data: { tracks: { connect: { id } } },
    });
  }
  async deleteTrack(id: string) {
    const favs = await this.getFavs();
    await this.databaseService.favorites.update({
      where: { id: favs.id },
      data: { tracks: { disconnect: { id } } },
      select: { tracks: true },
    });
    return true;
  }

  async addAlbum(id: string) {
    if (!(await this.isExist('album', id))) return undefined;
    const favs = await this.getFavs();

    return await this.databaseService.favorites.update({
      where: { id: favs.id },
      data: { albums: { connect: { id } } },
    });
  }
  async deleteAlbum(id: string) {
    const favs = await this.getFavs();
    await this.databaseService.favorites.update({
      where: { id: favs.id },
      data: { albums: { disconnect: { id } } },
      select: { albums: true },
    });
    return true;
  }

  async addArtist(id: string) {
    if (!(await this.isExist('artist', id))) return undefined;
    const favs = await this.getFavs();

    return await this.databaseService.favorites.update({
      where: { id: favs.id },
      data: { artists: { connect: { id } } },
    });
  }
  async deleteArtist(id: string) {
    const favs = await this.getFavs();
    await this.databaseService.favorites.update({
      where: { id: favs.id },
      data: { artists: { disconnect: { id } } },
      select: { artists: true },
    });
    return true;
  }
}
