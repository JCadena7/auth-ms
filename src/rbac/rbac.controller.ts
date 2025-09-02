import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RbacService } from './rbac.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { AssignPermisoToRoleDto } from './dto/assign-permiso-to-role.dto';

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

  // Permisos
  @MessagePattern('permiso.create')
  createPermiso(@Payload() dto: CreatePermisoDto) {
    return this.rbacService.createPermiso(dto);
  }

  @MessagePattern('permiso.list')
  listPermisos() {
    return this.rbacService.listPermisos();
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

  @MessagePattern('rolePermiso.listByRole')
  listPermisosByRole(@Payload('rolId', ParseIntPipe) rolId: number) {
    return this.rbacService.listPermisosByRole(rolId);
  }
}
