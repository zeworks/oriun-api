import { apolloControllerAdapter } from "@/main/adapters/apollo-controller";
import { makeCreateDepartmentController } from "@/main/factories/controllers/departments/create-department-controller-factory";
import { makeDeleteDepartmentController } from "@/main/factories/controllers/departments/delete-departmet-controller-factory";
import { makeLoadDepartmentByIdController } from "@/main/factories/controllers/departments/load-department-by-id-controller-factory";
import { makeLoadDepartmentsController } from "@/main/factories/controllers/departments/load-departments-controller-factory";
import { makeUpdateDepartmentController } from "@/main/factories/controllers/departments/update-department-controller-factory";

export default {
  Query: {
    departments: (_: any, args: any, context: any) => apolloControllerAdapter(makeLoadDepartmentsController(), args, context),
    department: (_: any, args: any, context: any) => apolloControllerAdapter(makeLoadDepartmentByIdController(), args, context),
  },
  Mutation: {
    createDepartment: (_: any, args: any, context: any) => apolloControllerAdapter(makeCreateDepartmentController(), args.input, context),
    updateDepartment: (_: any, args: any, context: any) => apolloControllerAdapter(makeUpdateDepartmentController(), args, context),
    deleteDepartment: (_: any, args: any, context: any) => apolloControllerAdapter(makeDeleteDepartmentController(), args, context),
  }
}
