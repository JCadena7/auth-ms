import { RoleName } from '../value-objects/role-name.vo';
import { RoleDescription } from '../value-objects/role-description.vo';

export class Role {
  private constructor(
    public readonly id: number | null,
    public readonly nombre: RoleName,
    public readonly descripcion: RoleDescription,
    public readonly createdAt?: Date | null,
    public readonly updatedAt?: Date | null,
  ) {}

  static createNew(props: { nombre: string; descripcion?: string | null }): Role {
    return new Role(
      null,
      RoleName.create(props.nombre),
      RoleDescription.create(props.descripcion ?? null),
      null,
      null,
    );
  }

  static fromPrimitive(row: any): Role {
    return new Role(
      row.id ?? null,
      RoleName.create(row.nombre),
      RoleDescription.create(row.descripcion ?? null),
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
