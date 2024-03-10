import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { validate as uuidValidate } from 'uuid';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UpdatePasswordDto } from 'src/dto/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!uuidValidate(id))
      throw new BadRequestException('id is not a valid uuid');

    const user = this.userService.findOne(id);
    if (!user) throw new NotFoundException('There is no user with this id');
    return user;
  }
  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() dto: CreateUserDto) {
    const newUser = this.userService.create(dto);
    return newUser;
  }
  @UsePipes(new ValidationPipe())
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePasswordDto) {
    if (!uuidValidate(id))
      throw new BadRequestException('id is not a valid uuid');

    const updatedUser = this.userService.update(id, dto);
    if (updatedUser === undefined)
      throw new NotFoundException('There is no user with this id');
    if (updatedUser === null)
      throw new ForbiddenException('Old password is incorrect');
    return updatedUser;
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    if (!uuidValidate(id))
      throw new BadRequestException('id is not a valid uuid');
    const userDeleteResponse = this.userService.delete(id);
    if (userDeleteResponse === undefined)
      throw new NotFoundException('There is no user with this id');
  }
}
