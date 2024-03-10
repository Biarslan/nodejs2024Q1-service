import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UpdatePasswordDto } from 'src/dto/updateUser.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}
  findAll() {
    const db = this.databaseService.getDB();
    const cleanUsers = [...db.users].map((user) => {
      delete user.password;
      return user;
    });
    return cleanUsers;
  }
  findOne(id: string) {
    const db = this.databaseService.getDB();
    const user = db.users.find((user) => user.id === id);
    if (user === undefined) return undefined;
    const cleanUser = { ...user };
    delete cleanUser.password;
    return user;
  }
  create(dto: CreateUserDto) {
    const newUser = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const db = this.databaseService.getDB();
    db.users.push({ ...newUser });
    this.databaseService.updateDB(db);
    delete newUser.password;
    return newUser;
  }
  update(id: string, dto: UpdatePasswordDto) {
    const db = this.databaseService.getDB();
    const user = db.users.find((user) => user.id === id);
    if (user === undefined) return undefined;
    if (user.password !== dto.oldPassword) return null;
    const updatedUser = {
      ...user,
      password: dto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };
    const updatedUsers = db.users.filter((user) => user.id !== id);
    updatedUsers.push(updatedUser);
    db.users = updatedUsers;
    this.databaseService.updateDB(db);
    delete updatedUser.password;
    return updatedUser;
  }
  delete(id: string) {
    const db = this.databaseService.getDB();
    const user = db.users.find((user) => user.id === id);
    if (user === undefined) return undefined;
    const updatedUsers = db.users.filter((user) => user.id !== id);
    db.users = updatedUsers;
    this.databaseService.updateDB(db);
    return true;
  }
}
