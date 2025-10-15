import { User } from '../entities/user.entity';

export interface CreateUserProps {
  externalId?: string | null; // supabase user id stored at usuarios.clerk_id
  username?: string | null;
  email: string;
  passwordHash?: string | null;
  firstName: string;
  lastName: string;
  rolId?: number | null;
  phone?: string | null;
  avatar?: string | null;
  bio?: string | null;
  status?: string;
  isVerified?: boolean;
}

export interface UserRepository {
  create(data: CreateUserProps): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findByExternalId(externalId: string): Promise<User | null>;
  findByEmailOrUsername(identifier: string): Promise<User | null>;
}
