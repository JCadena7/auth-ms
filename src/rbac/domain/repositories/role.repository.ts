import { Role } from '../aggregates/role.aggregate';

export interface RoleRepository {
  create(role: Role): Promise<Role>;
  findAll(): Promise<Role[]>;
  findById(id: number): Promise<Role | null>;
  findByName(nombre: string): Promise<Role | null>;
  update(id: number, patch: Partial<{ nombre: string; descripcion: string | null }>): Promise<Role | null>;
  remove(id: number): Promise<void>;
}
