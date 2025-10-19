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
      row.username ?? null,
      row.email,
      row.password_hash ?? null,
      row.first_name,
      row.last_name,
      row.rol_id ?? null,
      row.rol_name ?? null,
      row.avatar ?? null,
      row.cover_image ?? null,
      row.bio ?? null,
      row.website ?? null,
      row.location ?? null,
      row.phone ?? null,
      row.birth_date ? new Date(row.birth_date) : null,
      row.status ?? 'active',
      row.is_verified ?? false,
      row.online_status ?? 'offline',
      row.last_login ? new Date(row.last_login) : null,
      row.created_at ? new Date(row.created_at) : undefined,
      row.updated_at ? new Date(row.updated_at) : undefined,
    );
  }

  async create(data: CreateUserProps): Promise<User> {
    const q = this.db.sql`
      INSERT INTO usuarios (
        clerk_id, username, email, password_hash, first_name, last_name, 
        rol_id, phone, avatar, bio, status, is_verified
      )
      VALUES (
        ${data.externalId ?? null}, 
        ${data.username ?? null}, 
        ${data.email}, 
        ${data.passwordHash ?? null}, 
        ${data.firstName}, 
        ${data.lastName}, 
        ${data.rolId ?? null}, 
        ${data.phone ?? null}, 
        ${data.avatar ?? null}, 
        ${data.bio ?? null}, 
        ${data.status ?? 'active'}, 
        ${data.isVerified ?? false}
      )
      ON CONFLICT (email) DO UPDATE SET 
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        username = EXCLUDED.username
      RETURNING *
    `;
    const rows = await this.db.query(q);
    return this.rowToUser(rows[0]);
  }

  async findByEmail(email: string): Promise<User | null> {
    const q = this.db.sql`
      SELECT u.*, r.nombre as rol_name 
      FROM usuarios u
      LEFT JOIN roles r ON u.rol_id = r.id
      WHERE u.email = ${email} 
      LIMIT 1
    `;
    const rows = await this.db.query(q);
    return rows[0] ? this.rowToUser(rows[0]) : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const q = this.db.sql`
      SELECT u.*, r.nombre as rol_name 
      FROM usuarios u
      LEFT JOIN roles r ON u.rol_id = r.id
      WHERE u.username = ${username} 
      LIMIT 1
    `;
    const rows = await this.db.query(q);
    return rows[0] ? this.rowToUser(rows[0]) : null;
  }

  async findByExternalId(externalId: string): Promise<User | null> {
    const q = this.db.sql`
      SELECT u.*, r.nombre as rol_name 
      FROM usuarios u
      LEFT JOIN roles r ON u.rol_id = r.id
      WHERE u.clerk_id = ${externalId} 
      LIMIT 1
    `;
    const rows = await this.db.query(q);
    return rows[0] ? this.rowToUser(rows[0]) : null;
  }

  async findByEmailOrUsername(identifier: string): Promise<User | null> {
    const q = this.db.sql`
      SELECT u.*, r.nombre as rol_name 
      FROM usuarios u
      LEFT JOIN roles r ON u.rol_id = r.id
      WHERE u.email = ${identifier} OR u.username = ${identifier} 
      LIMIT 1
    `;
    const rows = await this.db.query(q);
    return rows[0] ? this.rowToUser(rows[0]) : null;
  }
}
