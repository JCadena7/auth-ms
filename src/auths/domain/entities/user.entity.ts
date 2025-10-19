export class User {
  constructor(
    public readonly id: number | null,
    public readonly externalId: string | null, // maps to usuarios.clerk_id (external auth id)
    public readonly username: string | null,
    public readonly email: string,
    public readonly passwordHash: string | null,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly rolId: number | null,
    public readonly rolName: string | null, // role name from roles table
    public readonly avatar: string | null,
    public readonly coverImage: string | null,
    public readonly bio: string | null,
    public readonly website: string | null,
    public readonly location: string | null,
    public readonly phone: string | null,
    public readonly birthDate: Date | null,
    public readonly status: string,
    public readonly isVerified: boolean,
    public readonly onlineStatus: string,
    public readonly lastLogin: Date | null,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
