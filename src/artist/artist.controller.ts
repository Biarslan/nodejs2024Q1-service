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
  async findAll() {
    return this.artistService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.artistService.findOne(id);
    if (!artist) throw new NotFoundException('There is no artist with this id');
    return artist;
  }
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: ArtistDto) {
    const newArtist = await this.artistService.create(dto);
    return newArtist;
  }
  @UsePipes(new ValidationPipe())
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: ArtistDto,
  ) {
    const updatedArtist = await this.artistService.update(id, dto);
    if (updatedArtist === undefined)
      throw new NotFoundException('There is no artist with this id');
    return updatedArtist;
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const artistDeleteResponse = await this.artistService.delete(id);
    if (artistDeleteResponse === undefined)
      throw new NotFoundException('There is no artist with this id');
  }
}
