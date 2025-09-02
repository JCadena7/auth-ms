import { Injectable, Inject } from '@nestjs/common';
import type { DB } from '../../../database/pg';
import { PG_DB } from '../../../database/tokens';
import { PermisoRepository } from '../../domain/repositories/permiso.repository';
import { Permiso } from '../../domain/aggregates/permiso.aggregate';

@Injectable()
export class PermisoPgRepository implements PermisoRepository {
  constructor(@Inject(PG_DB) private readonly db: DB) {}

  async create(permiso: Permiso): Promise<Permiso> {
    const q = this.db.sql`INSERT INTO permisos (nombre, descripcion) VALUES (${permiso.nombre.value}, ${permiso.descripcion.value}) RETURNING *`;
    const rows = await this.db.query<any>(q);
    return Permiso.fromPrimitive(rows[0]);
  }

  async findAll(): Promise<Permiso[]> {
    const rows = await this.db.query<any>(`SELECT * FROM permisos ORDER BY id ASC`);
    return rows.map(Permiso.fromPrimitive);
  }

  async findById(id: number): Promise<Permiso | null> {
    const rows = await this.db.query<any>(`SELECT * FROM permisos WHERE id = $1`, [id]);
    return rows[0] ? Permiso.fromPrimitive(rows[0]) : null;
  }

  async findByName(nombre: string): Promise<Permiso | null> {
    const rows = await this.db.query<any>(`SELECT * FROM permisos WHERE nombre = $1`, [nombre]);
    return rows[0] ? Permiso.fromPrimitive(rows[0]) : null;
  }

  async update(id: number, patch: Partial<{ nombre: string; descripcion: string | null }>): Promise<Permiso | null> {
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
    const sql = `UPDATE permisos SET ${sets.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${i} RETURNING *`;
    const rows = await this.db.query<any>(sql, values);
    return rows[0] ? Permiso.fromPrimitive(rows[0]) : null;
  }

  async remove(id: number): Promise<void> {
    await this.db.query(`DELETE FROM permisos WHERE id = $1`, [id]);
  }

  async removeMany(ids: number[]): Promise<number> {
    if (!ids || ids.length === 0) return 0;
    const rows = await this.db.query<any>(
      `DELETE FROM permisos WHERE id = ANY($1::int[]) RETURNING id`,
      [ids],
    );
    return rows.length;
  }
}
