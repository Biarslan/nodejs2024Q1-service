import { Injectable } from '@nestjs/common';
import { DataBase } from './db.interface';

@Injectable()
export class DatabaseService {
  db: DataBase = {
    users: [],
    artists: [],
    albums: [],
    tracks: [],
    favorites: {
      artists: [],
      albums: [],
      tracks: [],
    },
  };
  getDB() {
    return this.db;
  }
  updateDB(updatedDB: DataBase) {
    this.db = updatedDB;
  }
}
