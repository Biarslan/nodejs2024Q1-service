import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UpdatePasswordDto } from 'src/dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}
  async findAll() {
    const users = await this.databaseService.user.findMany();
    const cleanUsers = users.map((user) => {
      delete user.password;
      return {
        ...user,
        createdAt: user.createdAt.getTime(),
        updatedAt: user.updatedAt.getTime(),
      };
    });
    return cleanUsers;
  }
  async findOne(id: string) {
    const user = await this.databaseService.user.findUnique({ where: { id } });
    if (user === null) return undefined;
    const cleanUser = {
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };
    delete cleanUser.password;
    return user;
  }
  async create(dto: CreateUserDto) {
    const newUser = await this.databaseService.user.create({ data: dto });
    delete newUser.password;
    return {
      ...newUser,
      createdAt: newUser.createdAt.getTime(),
      updatedAt: newUser.updatedAt.getTime(),
    };
  }
  async update(id: string, dto: UpdatePasswordDto) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id,
      },
    });
    if (user === null) return undefined;
    if (user.password !== dto.oldPassword) return null;
    const updatedUser = await this.databaseService.user.update({
      where: { id },
      data: {
        password: dto.newPassword,
        version: { increment: 1 },
      },
    });

    delete updatedUser.password;
    return {
      ...updatedUser,
      createdAt: updatedUser.createdAt.getTime(),
      updatedAt: updatedUser.updatedAt.getTime(),
    };
  }
  async delete(id: string) {
    const user = await this.databaseService.user.findUnique({ where: { id } });
    if (user === null) return undefined;
    await this.databaseService.user.delete({ where: { id } });
    return true;
  }
}
