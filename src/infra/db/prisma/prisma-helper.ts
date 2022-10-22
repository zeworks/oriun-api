import { PrismaClient } from "@prisma/client"

const db = new PrismaClient();

interface Collection {
  permissions: typeof db.permissions,
  roles: typeof db.roles,
  users: typeof db.users,
  departments: typeof db.departments,
  companies: typeof db.companies,
  contacts: typeof db.contacts
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
