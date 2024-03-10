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
  findAll() {
    return this.trackService.findAll();
  }
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.trackService.findOne(id);
    if (!track) throw new NotFoundException('There is no track with this id');
    return track;
  }
  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() dto: CreateTrackDto) {
    const newTrack = this.trackService.create(dto);
    return newTrack;
  }
  @UsePipes(new ValidationPipe())
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateTrackDto,
  ) {
    const updatedTrack = this.trackService.update(id, dto);
    if (updatedTrack === undefined)
      throw new NotFoundException('There is no track with this id');
    return updatedTrack;
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const trackDeleteResponse = this.trackService.delete(id);
    if (trackDeleteResponse === undefined)
      throw new NotFoundException('There is no track with this id');
  }
}
