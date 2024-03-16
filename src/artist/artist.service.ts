import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ArtistDto } from 'src/dto/artist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly databaseService: DatabaseService) {}
  async findAll() {
    const artists = await this.databaseService.artist.findMany();
    return artists;
  }
  async findOne(id: string) {
    const artist = await this.databaseService.artist.findUnique({
      where: { id },
    });
    if (artist === null) return undefined;
    return artist;
  }
  async create(dto: ArtistDto) {
    const newArtist = await this.databaseService.artist.create({ data: dto });
    return newArtist;
  }
  async update(id: string, dto: ArtistDto) {
    const artist = await this.databaseService.artist.findUnique({
      where: { id },
    });

    if (artist === null) return undefined;
    const updatedArtist = await this.databaseService.artist.update({
      where: { id },
      data: dto,
    });
    return updatedArtist;
  }
  async delete(id: string) {
    const artist = await this.databaseService.artist.findUnique({
      where: { id },
    });
    if (artist === null) return undefined;
    await this.databaseService.artist.delete({ where: { id } });
    // const updatedArtists = db.artists.filter((artist) => artist.id !== id);
    // const updatedTracks = db.tracks.map((track) => {
    //   return track.artistId === id ? { ...track, artistId: null } : track;
    // });
    // const updatedFavArtist = db.favorites.artists.filter(
    //   (artistId) => artistId !== id,
    // );
    // db.favorites.artists = updatedFavArtist;
    // db.artists = updatedArtists;
    // db.tracks = updatedTracks;
    return true;
  }
}
