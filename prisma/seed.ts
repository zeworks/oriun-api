import { PERMISSION_KEYS } from "./config/constants";
import { PrismaClient } from "@prisma/client"
import { v4 } from "uuid";
import { hash } from "bcrypt"

const prisma = new PrismaClient();

async function main() {
  let permissions: string[] = [];

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
      permissions.push(data.id);
      console.log('running permission', data);
    }
  }

  // setup admin role and permissions
  const admin_role = await prisma.roles.create({
    data: {
      id: v4(),
      key: "admin",
      name: "Admin",
      status: true,
      permissions: {
        connect: permissions.map(permission => ({
          id: permission
        }))
      }
    },
    include: {
      permissions: true,
    }
  })

  console.log('Admin Role', admin_role);
  
  // setup admin user
  const admin_user = await prisma.users.create({
    data: {
      id: v4(),
      email: "admin@oriun.pt",
      firstName: "Admin",
      username: "oriun_admin",
      password: await hash("oriun", 8),
      status: true,
      role: {
        connect: {
          id: admin_role.id
        }
      }
    }
  })

  console.log('Admin User', admin_user);
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
