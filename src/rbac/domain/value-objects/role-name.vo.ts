export class RoleName {
  private constructor(public readonly value: string) {}

  static create(value: string): RoleName {
    const v = (value ?? '').trim();
    if (!v) throw new Error('RoleName: nombre es requerido');
    if (v.length > 50) throw new Error('RoleName: nombre máximo 50 caracteres');
    return new RoleName(v);
  }
}
