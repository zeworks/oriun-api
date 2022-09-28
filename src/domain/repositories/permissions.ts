import { CreatePermissionUseCase } from "../usecases/permissions/create-permission";
import { DeletePermissionUseCase } from "../usecases/permissions/delete-permission";
import { GetAllPermissionsUseCase } from "../usecases/permissions/get-all-permissions";
import { GetPermissionByIdUseCase } from "../usecases/permissions/get-permission";
import { UpdatePermissionUseCase } from "../usecases/permissions/update-permission";

export interface PermissionsRepository {
  create: CreatePermissionUseCase,
  update: UpdatePermissionUseCase,
  delete: DeletePermissionUseCase,
  getById: GetPermissionByIdUseCase,
  getAll: GetAllPermissionsUseCase
}
