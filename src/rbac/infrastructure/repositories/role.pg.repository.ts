import { Injectable, Inject } from '@nestjs/common';
import type { DB } from '../../../database/pg';
import { PG_DB } from '../../../database/tokens';
import { RoleRepository } from '../../domain/repositories/role.repository';
import { Role } from '../../domain/aggregates/role.aggregate';

@Injectable()
export class RolePgRepository implements RoleRepository {
  constructor(@Inject(PG_DB) private readonly db: DB) {}

  async create(role: Role): Promise<Role> {
    const q = this.db.sql`INSERT INTO roles (nombre, descripcion) VALUES (${role.nombre.value}, ${role.descripcion.value}) RETURNING *`;
    const rows = await this.db.query<any>(q);
    return Role.fromPrimitive(rows[0]);
  }

  async findAll(): Promise<Role[]> {
    const rows = await this.db.query<any>(`SELECT * FROM roles ORDER BY id ASC`);
    return rows.map(Role.fromPrimitive);
  }

  async findById(id: number): Promise<Role | null> {
    const rows = await this.db.query<any>(`SELECT * FROM roles WHERE id = $1`, [id]);
    return rows[0] ? Role.fromPrimitive(rows[0]) : null;
  }

  async findByName(nombre: string): Promise<Role | null> {
    const rows = await this.db.query<any>(`SELECT * FROM roles WHERE nombre = $1`, [nombre]);
    return rows[0] ? Role.fromPrimitive(rows[0]) : null;
  }

  async update(id: number, patch: Partial<{ nombre: string; descripcion: string | null }>): Promise<Role | null> {
    const sets: string[] = [];
    const values: any[] = [];
    let i = 1;
    if (patch.nombre !== undefined) {
      sets.push(`nombre = $${i++}`);
      values.push(patch.nombre);
    }
    if (patch.descripcion !== undefined) {
      sets.push(`descripcion = $${i++}`);
      values.push(patch.descripcion);
    }
    if (sets.length === 0) return this.findById(id);
    values.push(id);
    const sql = `UPDATE roles SET ${sets.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${i} RETURNING *`;
    const rows = await this.db.query<any>(sql, values);
    return rows[0] ? Role.fromPrimitive(rows[0]) : null;
  }

  async remove(id: number): Promise<void> {
    await this.db.query(`DELETE FROM roles WHERE id = $1`, [id]);
  }
}
