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
import { AlbumService } from './album.service';
import { AlbumDto } from 'src/dto/album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findAll() {
    return this.albumService.findAll();
  }
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.albumService.findOne(id);
    if (!album) throw new NotFoundException('There is no album with this id');
    return album;
  }
  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() dto: AlbumDto) {
    const newAlbum = this.albumService.create(dto);
    return newAlbum;
  }
  @UsePipes(new ValidationPipe())
  @Put(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: AlbumDto) {
    const updatedAlbum = this.albumService.update(id, dto);
    if (updatedAlbum === undefined)
      throw new NotFoundException('There is no album with this id');
    return updatedAlbum;
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const albumDeleteResponse = this.albumService.delete(id);
    if (albumDeleteResponse === undefined)
      throw new NotFoundException('There is no album with this id');
  }
}
