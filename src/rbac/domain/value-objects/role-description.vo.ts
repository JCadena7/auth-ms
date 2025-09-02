export class RoleDescription {
  private constructor(public readonly value: string | null) {}

  static create(value?: string | null): RoleDescription {
    const v = (value ?? '').trim();
    if (!v) return new RoleDescription(null);
    return new RoleDescription(v);
  }
}
