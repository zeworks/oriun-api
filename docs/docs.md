# Oriun API Documentation

## 1. Requirements:

This project is made with:

- NodeJS + Typescript;
- Prisma (Database);
- GraphQL;

## 2. Use cases:

- Users [**ADMIN**]:
  - [create user](../src/domain/usecases/users/create-account.ts);
  - update user;
  - [delete user](../src/domain/usecases/users/delete-account.ts);
  - list users;
  - [get user by id](../src/domain/usecases/users/load-account-by-id.ts);
- Departments [**ADMIN**]:
  - [create department](../src/domain/usecases/departments/create-department.ts);
  - [update department](../src/domain/usecases/departments/update-department.ts);
  - [delete department](../src/domain/usecases/departments/delete-department.ts);
  - [list departments](../src/domain/usecases/departments/load-departments.ts);
  - [get department by id](../src/domain/usecases/departments/load-department-by-id.ts);

## 3. Middlewares:

- Auth

## 4. Decorators:

- Acl
