import { PrismaClient } from "@prisma/client"

const db = new PrismaClient();

interface Collection {
  permissions: typeof db.permissions,
  roles: typeof db.roles,
  users: typeof db.users,
}

export const PrismaHelper = {
  async connect() {
    return db.$connect();
  },

  async disconnect() {
    return db.$disconnect();
  },

  getCollection<K extends keyof Collection>(collection: K): Collection[K] {
    return db[collection];
  }
}
