import { INestApplication, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient {
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }

  // db: DataBase = {
  //   users: [],
  //   artists: [],
  //   albums: [],
  //   tracks: [],
  //   favorites: {
  //     artists: [],
  //     albums: [],
  //     tracks: [],
  //   },
  // };
  // getDB() {
  //   return this.db;
  // }
  // updateDB(updatedDB: DataBase) {
  //   this.db = updatedDB;
  // }
}
