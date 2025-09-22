export type Role =
  | 'Cliente'
  | 'Recepcion'
  | 'Operaciones'
  | 'Calidad'
  | 'Transportes'
  | 'Administracion'
  | 'DirectorTecnico';

export const ALL_ROLES: Role[] = [
  'Cliente',
  'Recepcion',
  'Operaciones',
  'Calidad',
  'Transportes',
  'Administracion',
  'DirectorTecnico',
];

export const ROUTES = {
  dashboard: '/dashboard',
  receiving: '/receiving',
  orders: '/orders',
  inventory: '/inventory',
  optimizer: '/optimizer',
  reports: '/reports',
  users: '/users',
  settings: '/settings',
};

// Permissions are mapped to route keys used by the sidebar/navigation.
export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  Cliente: [ROUTES.dashboard, ROUTES.orders],
  Recepcion: [ROUTES.dashboard, ROUTES.receiving, ROUTES.reports],
  Operaciones: [ROUTES.dashboard, ROUTES.receiving, ROUTES.inventory, ROUTES.orders, ROUTES.reports],
  Calidad: [ROUTES.dashboard, ROUTES.receiving, ROUTES.reports],
  Transportes: [ROUTES.dashboard, ROUTES.orders, ROUTES.optimizer],
  Administracion: [
    ROUTES.dashboard,
    ROUTES.receiving,
    ROUTES.inventory,
    ROUTES.orders,
    ROUTES.reports,
    ROUTES.users,
    ROUTES.settings,
  ],
  DirectorTecnico: [ROUTES.dashboard, ROUTES.reports],
};

export function canAccess(role: Role, route: string) {
  return ROLE_PERMISSIONS[role]?.includes(route);
}
