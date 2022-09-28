enum PERMISSION_PARENT_KEYS {
  ModuleDepartments = "module_departments",
  ModuleCompanies = "module_companies",
  ModuleUsers = "module_users",
  ModuleTimesheets = "module_timesheets",
  ModuleClients = "module_clients",
  ModuleRoles = "module_roles",
  ModuleProjects = "module_projects",
}

export const PERMISSION_KEYS = [
  //#region Departments
  {
    name: "Create Department",
    key: "permission_departments_create",
    parent: PERMISSION_PARENT_KEYS.ModuleDepartments,
    status: true,
  },
  {
    name: "Update Department",
    key: "permission_departments_update",
    parent: PERMISSION_PARENT_KEYS.ModuleDepartments,
    status: true,
  },
  {
    name: "Delete Department",
    key: "permission_departments_delete",
    parent: PERMISSION_PARENT_KEYS.ModuleDepartments,
    status: true,
  },
  {
    name: "View Department",
    key: "permission_departments_view",
    parent: PERMISSION_PARENT_KEYS.ModuleDepartments,
    status: true,
  },
  //#endregion
  //#region Companies
  {
    name: "Create Company",
    key: "permission_companies_create",
    parent: PERMISSION_PARENT_KEYS.ModuleCompanies,
    status: true,
  },
  {
    name: "Update Company",
    key: "permission_companies_update",
    parent: PERMISSION_PARENT_KEYS.ModuleCompanies,
    status: true,
  },
  {
    name: "Delete Company",
    key: "permission_companies_delete",
    parent: PERMISSION_PARENT_KEYS.ModuleCompanies,
    status: true,
  },
  {
    name: "View Company",
    key: "permission_companies_view",
    parent: PERMISSION_PARENT_KEYS.ModuleCompanies,
    status: true,
  },
  //#endregion
  //#region Users
  {
    name: "Create User",
    key: "permission_users_create",
    parent: PERMISSION_PARENT_KEYS.ModuleUsers,
    status: true,
  },
  {
    name: "Update User",
    key: "permission_users_update",
    parent: PERMISSION_PARENT_KEYS.ModuleUsers,
    status: true,
  },
  {
    name: "Delete User",
    key: "permission_users_delete",
    parent: PERMISSION_PARENT_KEYS.ModuleUsers,
    status: true,
  },
  {
    name: "View User",
    key: "permission_users_view",
    parent: PERMISSION_PARENT_KEYS.ModuleUsers,
    status: true,
  },
  //#endregion
  //#region Timesheets
  {
    name: "Create Timesheet",
    key: "permission_timesheets_create",
    parent: PERMISSION_PARENT_KEYS.ModuleTimesheets,
    status: true,
  },
  {
    name: "Update Timesheet",
    key: "permission_timesheets_update",
    parent: PERMISSION_PARENT_KEYS.ModuleTimesheets,
    status: true,
  },
  {
    name: "Delete Timesheet",
    key: "permission_timesheets_delete",
    parent: PERMISSION_PARENT_KEYS.ModuleTimesheets,
    status: true,
  },
  {
    name: "View Timesheet",
    key: "permission_timesheets_view",
    parent: PERMISSION_PARENT_KEYS.ModuleTimesheets,
    status: true,
  },
  //#endregion
  //#region Clients
  {
    name: "Create Client",
    key: "permission_clients_create",
    parent: PERMISSION_PARENT_KEYS.ModuleClients,
    status: true,
  },
  {
    name: "Update Client",
    key: "permission_clients_update",
    parent: PERMISSION_PARENT_KEYS.ModuleClients,
    status: true,
  },
  {
    name: "Delete Client",
    key: "permission_clients_delete",
    parent: PERMISSION_PARENT_KEYS.ModuleClients,
    status: true,
  },
  {
    name: "View Client",
    key: "permission_clients_view",
    parent: PERMISSION_PARENT_KEYS.ModuleClients,
    status: true,
  },
  //#endregion
  //#region Roles
  {
    name: "Create Role",
    key: "permission_roles_create",
    parent: PERMISSION_PARENT_KEYS.ModuleRoles,
    status: true,
  },
  {
    name: "Update Role",
    key: "permission_roles_update",
    parent: PERMISSION_PARENT_KEYS.ModuleRoles,
    status: true,
  },
  {
    name: "Delete Role",
    key: "permission_roles_delete",
    parent: PERMISSION_PARENT_KEYS.ModuleRoles,
    status: true,
  },
  {
    name: "View Role",
    key: "permission_roles_view",
    parent: PERMISSION_PARENT_KEYS.ModuleRoles,
    status: true,
  },
  //#endregion
  //#region Projects
  {
    name: "Create Project",
    key: "permission_projects_create",
    parent: PERMISSION_PARENT_KEYS.ModuleProjects,
    status: true,
  },
  {
    name: "Update Project",
    key: "permission_projects_update",
    parent: PERMISSION_PARENT_KEYS.ModuleProjects,
    status: true,
  },
  {
    name: "Delete Project",
    key: "permission_projects_delete",
    parent: PERMISSION_PARENT_KEYS.ModuleProjects,
    status: true,
  },
  {
    name: "View Project",
    key: "permission_projects_view",
    parent: PERMISSION_PARENT_KEYS.ModuleProjects,
    status: true,
  },
  //#endregion
]
