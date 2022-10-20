import { PermissionKey } from "@/config/permissions";
import { apolloControllerAdapter } from "@/main/adapters/apollo-controller";
import { AclResolver } from "@/main/decorators/acl-resolver";
import { makeCreateDepartmentController } from "@/main/factories/controllers/departments/create-department-controller-factory";
import { makeDeleteDepartmentController } from "@/main/factories/controllers/departments/delete-departmet-controller-factory";
import { makeLoadDepartmentByIdController } from "@/main/factories/controllers/departments/load-department-by-id-controller-factory";
import { makeLoadDepartmentsController } from "@/main/factories/controllers/departments/load-departments-controller-factory";
import { makeUpdateDepartmentController } from "@/main/factories/controllers/departments/update-department-controller-factory";

export default {
  Query: {
    departments: (_: any, args: any, context: any) => apolloControllerAdapter(new AclResolver(makeLoadDepartmentsController(), PermissionKey.DepartmentsView), args, context),
    department: (_: any, args: any, context: any) => apolloControllerAdapter(new AclResolver(makeLoadDepartmentByIdController(), PermissionKey.DepartmentsView), args, context),
  },
  Mutation: {
    createDepartment: (_: any, args: any, context: any) => apolloControllerAdapter(new AclResolver(makeCreateDepartmentController(), PermissionKey.DepartmentsCreate), args.input, context),
    updateDepartment: (_: any, args: any, context: any) => apolloControllerAdapter(new AclResolver(makeUpdateDepartmentController(), PermissionKey.DepartmentsUpdate), args, context),
    deleteDepartment: (_: any, args: any, context: any) => apolloControllerAdapter(new AclResolver(makeDeleteDepartmentController(), PermissionKey.DepartmentsDelete), args, context),
  }
}
