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
import { TrackService } from './track.service';
import { CreateTrackDto } from 'src/dto/createTrack.dto';
import { UpdateTrackDto } from 'src/dto/updateTrack.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async findAll() {
    return await this.trackService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.trackService.findOne(id);
    if (!track) throw new NotFoundException('There is no track with this id');
    return track;
  }
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: CreateTrackDto) {
    const newTrack = await this.trackService.create(dto);
    return newTrack;
  }
  @UsePipes(new ValidationPipe())
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateTrackDto,
  ) {
    const updatedTrack = await this.trackService.update(id, dto);
    if (updatedTrack === undefined)
      throw new NotFoundException('There is no track with this id');
    return updatedTrack;
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const trackDeleteResponse = await this.trackService.delete(id);
    if (trackDeleteResponse === undefined)
      throw new NotFoundException('There is no track with this id');
  }
}
