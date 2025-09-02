export class PermisoName {
  private constructor(public readonly value: string) {}

  static create(value: string): PermisoName {
    const v = (value ?? '').trim();
    if (!v) throw new Error('PermisoName: nombre es requerido');
    if (v.length > 50) throw new Error('PermisoName: nombre máximo 50 caracteres');
    return new PermisoName(v);
  }
}
