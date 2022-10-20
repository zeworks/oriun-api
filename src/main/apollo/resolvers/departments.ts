import { PermissionKey } from "@/config/permissions";
import { apolloControllerAdapter } from "@/main/adapters/apollo-controller";
import { AclDecorator } from "@/main/decorators/acl-decorator";
import { makeCreateDepartmentController } from "@/main/factories/controllers/departments/create-department-controller-factory";
import { makeDeleteDepartmentController } from "@/main/factories/controllers/departments/delete-departmet-controller-factory";
import { makeLoadDepartmentByIdController } from "@/main/factories/controllers/departments/load-department-by-id-controller-factory";
import { makeLoadDepartmentsController } from "@/main/factories/controllers/departments/load-departments-controller-factory";
import { makeUpdateDepartmentController } from "@/main/factories/controllers/departments/update-department-controller-factory";

export default {
  Query: {
    departments: (_: any, args: any, context: any) => apolloControllerAdapter(new AclDecorator(makeLoadDepartmentsController(), PermissionKey.DepartmentsView), args, context),
    department: (_: any, args: any, context: any) => apolloControllerAdapter(new AclDecorator(makeLoadDepartmentByIdController(), PermissionKey.DepartmentsView), args, context),
  },
  Mutation: {
    createDepartment: (_: any, args: any, context: any) => apolloControllerAdapter(new AclDecorator(makeCreateDepartmentController(), PermissionKey.DepartmentsCreate), args.input, context),
    updateDepartment: (_: any, args: any, context: any) => apolloControllerAdapter(new AclDecorator(makeUpdateDepartmentController(), PermissionKey.DepartmentsUpdate), args, context),
    deleteDepartment: (_: any, args: any, context: any) => apolloControllerAdapter(new AclDecorator(makeDeleteDepartmentController(), PermissionKey.DepartmentsDelete), args, context),
  }
}
