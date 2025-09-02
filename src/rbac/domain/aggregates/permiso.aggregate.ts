import { PermisoName } from '../value-objects/permiso-name.vo';
import { PermisoDescription } from '../value-objects/permiso-description.vo';

export class Permiso {
  private constructor(
    public readonly id: number | null,
    public readonly nombre: PermisoName,
    public readonly descripcion: PermisoDescription,
    public readonly createdAt?: Date | null,
    public readonly updatedAt?: Date | null,
  ) {}

  static createNew(props: { nombre: string; descripcion?: string | null }): Permiso {
    return new Permiso(
      null,
      PermisoName.create(props.nombre),
      PermisoDescription.create(props.descripcion ?? null),
      null,
      null,
    );
  }

  static fromPrimitive(row: any): Permiso {
    return new Permiso(
      row.id ?? null,
      PermisoName.create(row.nombre),
      PermisoDescription.create(row.descripcion ?? null),
      row.created_at ? new Date(row.created_at) : null,
      row.updated_at ? new Date(row.updated_at) : null,
    );
  }

  toPrimitive() {
    return {
      id: this.id,
      nombre: this.nombre.value,
      descripcion: this.descripcion.value,
      created_at: this.createdAt?.toISOString() ?? null,
      updated_at: this.updatedAt?.toISOString() ?? null,
    };
  }
}
