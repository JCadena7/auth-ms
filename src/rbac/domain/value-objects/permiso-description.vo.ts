export class PermisoDescription {
  private constructor(public readonly value: string | null) {}

  static create(value?: string | null): PermisoDescription {
    const v = (value ?? '').trim();
    if (!v) return new PermisoDescription(null);
    return new PermisoDescription(v);
  }
}
