import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  async fildAll() {
    return await this.favsService.findAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const addTrackRes = await this.favsService.addTrack(id);
    if (!addTrackRes) {
      throw new UnprocessableEntityException(
        'Track with this id does not exist',
      );
    }
    return 'Track added to favorites';
  }
  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const deleteTrackRes = await this.favsService.deleteTrack(id);
    if (!deleteTrackRes) {
      throw new NotFoundException('Track with this id not found');
    }
    return 'Track deleted from favorites';
  }

  @Post('album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const addTrackRes = await this.favsService.addAlbum(id);
    if (!addTrackRes) {
      throw new UnprocessableEntityException(
        'Album with this id does not exist',
      );
    }
    return 'Album added to favorites';
  }
  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const deleteTrackRes = await this.favsService.deleteAlbum(id);
    if (!deleteTrackRes) {
      throw new NotFoundException('Album with this id not found');
    }
    return 'Album deleted from favorites';
  }
  @Post('artist/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const addArtistRes = await this.favsService.addArtist(id);
    if (!addArtistRes) {
      throw new UnprocessableEntityException(
        'Artist with this id does not exist',
      );
    }
    return 'Artist added to favorites';
  }
  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const deleteArtistRes = await this.favsService.deleteArtist(id);
    if (!deleteArtistRes) {
      throw new NotFoundException('Artist with this id not found');
    }
    return 'Artist deleted from favorites';
  }
}
