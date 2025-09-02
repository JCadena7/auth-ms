import { Permiso } from '../aggregates/permiso.aggregate';

export interface PermisoRepository {
  create(permiso: Permiso): Promise<Permiso>;
  findAll(): Promise<Permiso[]>;
  findById(id: number): Promise<Permiso | null>;
  findByName(nombre: string): Promise<Permiso | null>;
  update(id: number, patch: Partial<{ nombre: string; descripcion: string | null }>): Promise<Permiso | null>;
  remove(id: number): Promise<void>;
}
