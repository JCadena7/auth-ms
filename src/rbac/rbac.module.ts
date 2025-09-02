import { Module } from '@nestjs/common';
import { RbacService } from './rbac.service';
import { RbacController } from './rbac.controller';
import { DatabaseModule } from '../database/database.module';
import { ROLE_PERMISO_REPOSITORY, PERMISO_REPOSITORY, ROLE_REPOSITORY } from './tokens';
import { RolePgRepository } from './infrastructure/repositories/role.pg.repository';
import { PermisoPgRepository } from './infrastructure/repositories/permiso.pg.repository';
import { RolePermisoPgRepository } from './infrastructure/repositories/role-permiso.pg.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [RbacController],
  providers: [
    RbacService,
    { provide: ROLE_REPOSITORY, useClass: RolePgRepository },
    { provide: PERMISO_REPOSITORY, useClass: PermisoPgRepository },
    { provide: ROLE_PERMISO_REPOSITORY, useClass: RolePermisoPgRepository },
  ],
})
export class RbacModule {}
