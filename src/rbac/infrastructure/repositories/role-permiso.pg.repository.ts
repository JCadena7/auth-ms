import { Injectable, Inject } from '@nestjs/common';
import type { DB } from '../../../database/pg';
import { PG_DB } from '../../../database/tokens';
import { RolePermisoRepository } from '../../domain/repositories/role-permiso.repository';
import { RolePermiso } from '../../domain/entities/role-permiso.entity';

@Injectable()
export class RolePermisoPgRepository implements RolePermisoRepository {
  constructor(@Inject(PG_DB) private readonly db: DB) {}

  async assign(rolId: number, permisoId: number): Promise<RolePermiso> {
    const q = this.db.sql`
      INSERT INTO roles_permisos (rol_id, permiso_id)
      VALUES (${rolId}, ${permisoId})
      ON CONFLICT (rol_id, permiso_id) DO NOTHING
      RETURNING rol_id, permiso_id
    `;
    const rows = await this.db.query<any>(q);
    if (rows[0]) return new RolePermiso(rows[0].rol_id, rows[0].permiso_id);
    // If no row was returned due to conflict, return the existing relation shape
    return new RolePermiso(rolId, permisoId);
  }

  async revoke(rolId: number, permisoId: number): Promise<void> {
    await this.db.query(`DELETE FROM roles_permisos WHERE rol_id = $1 AND permiso_id = $2`, [rolId, permisoId]);
  }

  async listByRole(rolId: number): Promise<number[]> {
    const rows = await this.db.query<any>(`SELECT permiso_id FROM roles_permisos WHERE rol_id = $1 ORDER BY permiso_id`, [rolId]);
    return rows.map((r) => r.permiso_id as number);
  }
}
