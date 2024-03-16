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
  async findAll() {
    return await this.albumService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.albumService.findOne(id);
    if (!album) throw new NotFoundException('There is no album with this id');
    return album;
  }
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: AlbumDto) {
    const newAlbum = await this.albumService.create(dto);
    return newAlbum;
  }
  @UsePipes(new ValidationPipe())
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: AlbumDto,
  ) {
    const updatedAlbum = await this.albumService.update(id, dto);
    if (updatedAlbum === undefined)
      throw new NotFoundException('There is no album with this id');
    return updatedAlbum;
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const albumDeleteResponse = await this.albumService.delete(id);
    if (albumDeleteResponse === undefined)
      throw new NotFoundException('There is no album with this id');
  }
}
