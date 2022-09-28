import { PermissionsEntity } from "../entities/permissions";
import { CreatePermissionUseCase } from "../usecases/permissions/create-permission";
import { DeletePermissionUseCase } from "../usecases/permissions/delete-permission";
import { GetAllPermissionsUseCase } from "../usecases/permissions/get-all-permissions";
import { GetPermissionByIdUseCase } from "../usecases/permissions/get-permission";
import { UpdatePermissionUseCase } from "../usecases/permissions/update-permission";
import { PermissionsRepository } from "./permissions";

export class InMemoryPermissionsRepository implements PermissionsRepository {

  private permissions: PermissionsEntity[] = [];

  create: CreatePermissionUseCase = async (input) => {
    const data = {
      ...input,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const findExistingPermission = this.permissions.find(p => p.key === input.key);
    
    if (findExistingPermission)
      throw new Error("this permission already exists");

    if (!data.id)
      throw new Error("id missing");
    
    if (!data.key)
      throw new Error("key missing");
    
    if (!data.name)
      throw new Error("name missing");

    this.permissions.push(data)

    return data;
  };
  update: UpdatePermissionUseCase = async (input) => {
    if (!input.id)
      throw new Error("id missing");
    
    const permission = this.permissions.find(p => p.id === input.id);

    if (!permission)
      throw new Error("permission not found");
    
    return Promise.resolve(Object.assign(permission, input));
  };
  delete: DeletePermissionUseCase = async (input) => {
    const permission = this.permissions.find(p => p.id === input.id);

    if (!permission)
      throw new Error("permission not found");
    
    return true;
  };
  getById: GetPermissionByIdUseCase = async (input) => {
    const permission = this.permissions.find(p => p.id === input.id);

    if (!permission)
      throw new Error("permission not found");
    
    return permission;
  };
  getAll: GetAllPermissionsUseCase = async () => {
    return Promise.resolve(this.permissions);
  };
}
