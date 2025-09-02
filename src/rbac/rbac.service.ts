import { Inject, Injectable } from '@nestjs/common';
import { ROLE_PERMISO_REPOSITORY, PERMISO_REPOSITORY, ROLE_REPOSITORY } from './tokens';
import type { RoleRepository } from './domain/repositories/role.repository';
import type { PermisoRepository } from './domain/repositories/permiso.repository';
import type { RolePermisoRepository } from './domain/repositories/role-permiso.repository';
import { Role } from './domain/aggregates/role.aggregate';
import { Permiso } from './domain/aggregates/permiso.aggregate';
import { CreateRoleDto } from './dto/create-role.dto';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { AssignPermisoToRoleDto } from './dto/assign-permiso-to-role.dto';
import { DeleteByIdDto } from './dto/delete-by-id.dto';
import { DeleteManyDto } from './dto/delete-many.dto';
import { RevokeManyPermisosFromRoleDto } from './dto/revoke-many-permisos-from-role.dto';

@Injectable()
export class RbacService {
  constructor(
    @Inject(ROLE_REPOSITORY) private readonly roles: RoleRepository,
    @Inject(PERMISO_REPOSITORY) private readonly permisos: PermisoRepository,
    @Inject(ROLE_PERMISO_REPOSITORY) private readonly rolePermisos: RolePermisoRepository,
  ) {}

  // Roles
  async createRole(dto: CreateRoleDto) {
    const aggregate = Role.createNew({ nombre: dto.nombre, descripcion: dto.descripcion ?? null });
    const created = await this.roles.create(aggregate);
    return created.toPrimitive();
  }

  async listRoles() {
    const rows = await this.roles.findAll();
    return rows.map((r) => r.toPrimitive());
  }

  // Permisos
  async createPermiso(dto: CreatePermisoDto) {
    const aggregate = Permiso.createNew({ nombre: dto.nombre, descripcion: dto.descripcion ?? null });
    const created = await this.permisos.create(aggregate);
    return created.toPrimitive();
    
  }

  async listPermisos() {
    const rows = await this.permisos.findAll();
    return rows.map((p) => p.toPrimitive());
  }

  // Role-Permiso
  async assignPermiso(dto: AssignPermisoToRoleDto) {
    const rp = await this.rolePermisos.assign(dto.rolId, dto.permisoId);
    return { rolId: rp.rolId, permisoId: rp.permisoId };
  }

  async revokePermiso(dto: AssignPermisoToRoleDto) {
    // console.log("dto de servicio",dto);
    const resultado = await this.rolePermisos.revoke(dto.rolId, dto.permisoId);
    console.log("resultado de revoke permiso",resultado);
    return { success: true } as const;
  }

  async listPermisosByRole(rolId: number) {
    const ids = await this.rolePermisos.listByRole(rolId);
    return ids;
  }

  // Deletes - Roles
  async deleteRole(dto: DeleteByIdDto) {
    await this.roles.remove(dto.id);
    return { success: true } as const;
  }

  async deleteRoles(dto: DeleteManyDto) {
    const deleted = await this.roles.removeMany(dto.ids);
    return { deleted } as const;
  }

  // Deletes - Permisos
  async deletePermiso(dto: DeleteByIdDto) {
    await this.permisos.remove(dto.id);
    return { success: true } as const;
  }

  async deletePermisos(dto: DeleteManyDto) {
    const deleted = await this.permisos.removeMany(dto.ids);
    return { deleted } as const;
  }

  // Bulk revoke role-permiso
  async revokeManyPermisos(dto: RevokeManyPermisosFromRoleDto) {
    const deleted = await this.rolePermisos.revokeMany(dto.rolId, dto.permisoIds);
    return { deleted } as const;
  }
}
