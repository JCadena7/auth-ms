import { User } from '../entities/user.entity';

export interface CreateUserProps {
  externalId?: string | null; // supabase user id stored at usuarios.clerk_id
  nombre: string;
  email: string;
  rolId?: number | null;
}

export interface UserRepository {
  create(data: CreateUserProps): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByExternalId(externalId: string): Promise<User | null>;
}
