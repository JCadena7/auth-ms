import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RbacService } from './rbac.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { AssignPermisoToRoleDto } from './dto/assign-permiso-to-role.dto';
import { DeleteByIdDto } from './dto/delete-by-id.dto';
import { DeleteManyDto } from './dto/delete-many.dto';
import { RevokeManyPermisosFromRoleDto } from './dto/revoke-many-permisos-from-role.dto';

@Controller()
export class RbacController {
  constructor(private readonly rbacService: RbacService) {}

  // Roles
  @MessagePattern('role.create')
  createRole(@Payload() dto: CreateRoleDto) {
    return this.rbacService.createRole(dto);
  }

  @MessagePattern('role.list')
  listRoles() {
    return this.rbacService.listRoles();
  }

  @MessagePattern('role.delete')
  async deleteRole(@Payload() dto: DeleteByIdDto) {
    return await this.rbacService.deleteRole(dto);
  }

  @MessagePattern('role.deleteMany')
  async deleteRoles(@Payload() dto: DeleteManyDto) {
    return await this.rbacService.deleteRoles(dto);
  }

  // Permisos
  @MessagePattern('permiso.create')
  createPermiso(@Payload() dto: CreatePermisoDto) {
    return this.rbacService.createPermiso(dto);
  }

  @MessagePattern('permiso.list')
  listPermisos() {
    return this.rbacService.listPermisos();
  }

  @MessagePattern('permiso.delete')
  async deletePermiso(@Payload() dto: DeleteByIdDto) {
    return await this.rbacService.deletePermiso(dto);
  }

  @MessagePattern('permiso.deleteMany')
  async deletePermisos(@Payload() dto: DeleteManyDto) {
    return await this.rbacService.deletePermisos(dto);
  }

  // Role-Permiso assignments
  @MessagePattern('rolePermiso.assign')
  assignPermiso(@Payload() dto: AssignPermisoToRoleDto) {
    return this.rbacService.assignPermiso(dto);
  }

  @MessagePattern('rolePermiso.revoke')
  async revokePermiso(@Payload() dto: AssignPermisoToRoleDto) {
    console.log("dto de controlador del permisos y roles",dto);
    const respuesta = await this.rbacService.revokePermiso(dto);
    console.log("respuesta de eliminar permisos y roles",respuesta);
    return respuesta;
  }

  @MessagePattern('rolePermiso.revokeMany')
  async revokeManyPermisos(@Payload() dto: RevokeManyPermisosFromRoleDto) {
    return await this.rbacService.revokeManyPermisos(dto);
  }

  @MessagePattern('rolePermiso.listByRole')
  listPermisosByRole(@Payload('rolId', ParseIntPipe) rolId: number) {
    return this.rbacService.listPermisosByRole(rolId);
  }
}
