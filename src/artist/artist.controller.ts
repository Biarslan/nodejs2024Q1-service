import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistDto } from 'src/dto/artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  findAll() {
    return this.artistService.findAll();
  }
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = this.artistService.findOne(id);
    if (!artist) throw new NotFoundException('There is no artist with this id');
    return artist;
  }
  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() dto: ArtistDto) {
    const newArtist = this.artistService.create(dto);
    return newArtist;
  }
  @UsePipes(new ValidationPipe())
  @Put(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: ArtistDto) {
    const updatedArtist = this.artistService.update(id, dto);
    if (updatedArtist === undefined)
      throw new NotFoundException('There is no artist with this id');
    return updatedArtist;
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const artistDeleteResponse = this.artistService.delete(id);
    if (artistDeleteResponse === undefined)
      throw new NotFoundException('There is no artist with this id');
  }
}
