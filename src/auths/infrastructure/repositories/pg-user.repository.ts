import { Inject } from '@nestjs/common';
import { PG_DB } from '../../../database/tokens';
import type { DB } from '../../../database/pg';
import { User } from '../../domain/entities/user.entity';
import { CreateUserProps, UserRepository } from '../../domain/repositories/user.repository';

export class PgUserRepository implements UserRepository {
  constructor(@Inject(PG_DB) private readonly db: DB) {}

  private rowToUser(row: any): User {
    return new User(
      row.id ?? null,
      row.clerk_id ?? null,
      row.nombre,
      row.email,
      row.rol_id ?? null,
      row.created_at ? new Date(row.created_at) : undefined,
      row.updated_at ? new Date(row.updated_at) : undefined,
    );
  }

  async create(data: CreateUserProps): Promise<User> {
    const q = this.db.sql`
      INSERT INTO usuarios (clerk_id, nombre, email, rol_id)
      VALUES (${data.externalId ?? null}, ${data.nombre}, ${data.email}, ${data.rolId ?? null})
      ON CONFLICT (email) DO UPDATE SET nombre = EXCLUDED.nombre RETURNING *
    `;
    const rows = await this.db.query(q);
    return this.rowToUser(rows[0]);
  }

  async findByEmail(email: string): Promise<User | null> {
    const q = this.db.sql`SELECT * FROM usuarios WHERE email = ${email} LIMIT 1`;
    const rows = await this.db.query(q);
    return rows[0] ? this.rowToUser(rows[0]) : null;
  }

  async findByExternalId(externalId: string): Promise<User | null> {
    const q = this.db.sql`SELECT * FROM usuarios WHERE clerk_id = ${externalId} LIMIT 1`;
    const rows = await this.db.query(q);
    return rows[0] ? this.rowToUser(rows[0]) : null;
  }
}
