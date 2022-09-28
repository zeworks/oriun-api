import { PERMISSION_KEYS } from "./config/constants";
import { PrismaClient } from "@prisma/client"
import { v4 } from "uuid";

const prisma = new PrismaClient();

async function main() {
  // run permissions
  for (const permission of PERMISSION_KEYS) {
    const foundKey = await prisma.permissions.findUnique({ where: { key: permission.key } });

    if (!foundKey) {
      const data = await prisma.permissions.create({
        data: {
          id: v4(),
          name: permission.name,
          key: permission.key,
          parent: permission.parent,
          status: permission.status
        }
      })
      console.log('running permission', data);
    }
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
