import { RolePermiso } from '../entities/role-permiso.entity';

export interface RolePermisoRepository {
  assign(rolId: number, permisoId: number): Promise<RolePermiso>;
  revoke(rolId: number, permisoId: number): Promise<void>;
  listByRole(rolId: number): Promise<number[]>; // returns permiso IDs
  revokeMany(rolId: number, permisoIds: number[]): Promise<number>; // returns number of rows deleted
}
