import { CreatePermissionUseCase } from "../usecases/permissions/create-permission";

export interface PermissionsRepository {
  create: CreatePermissionUseCase
}
