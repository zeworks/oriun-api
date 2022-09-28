export enum PERMISSION_PARENT_KEYS {
  ModuleDepartments = "module_departments",
  ModuleCompanies = "module_companies",
  ModuleClients = "module_clients",
  ModuleUsers = "module_users",
  ModuleTimesheets = "module_timesheets",
  ModuleRoles = "module_roles",
  ModuleProjects = "module_projects",
}

export const PERMISSION_KEYS = [
  {
    name: "Create Permission",
    key: "permission_departments_create",
    parent: PERMISSION_PARENT_KEYS.ModuleDepartments,
    status: true,
  },
  {
    name: "Update Permission",
    key: "permission_departments_update",
    parent: PERMISSION_PARENT_KEYS.ModuleDepartments,
    status: false,
  }
]
