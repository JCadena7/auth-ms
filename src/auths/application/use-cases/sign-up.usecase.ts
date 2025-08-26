import { Inject, Injectable } from '@nestjs/common';
import { AUTH_PROVIDER, USER_REPOSITORY } from '../../tokens';
import type { AuthProvider } from '../../domain/services/auth-provider';
import type { UserRepository } from '../../domain/repositories/user.repository';
import { SignUpDto } from '../dto/sign-up.dto';

@Injectable()
export class SignUpUseCase {
  constructor(
    @Inject(AUTH_PROVIDER) private readonly auth: AuthProvider,
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
  ) {}

  async exec(input: SignUpDto) {
    const { userId } = await this.auth.signUp({ email: input.email, password: input.password });

    // persist domain user (maps Supabase user id to usuarios.clerk_id)
    const user = await this.users.create({
      externalId: userId,
      nombre: input.nombre,
      email: input.email,
      rolId: 4,
    });

    return { userId: user.externalId, email: user.email, nombre: user.nombre };
  }
}
