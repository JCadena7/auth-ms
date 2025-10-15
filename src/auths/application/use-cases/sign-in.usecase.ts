import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AUTH_PROVIDER, USER_REPOSITORY } from '../../tokens';
import type { AuthProvider } from '../../domain/services/auth-provider';
import type { UserRepository } from '../../domain/repositories/user.repository';
import { SignInDto } from '../dto/sign-in.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SignInUseCase {
  constructor(
    @Inject(AUTH_PROVIDER) private readonly auth: AuthProvider,
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
  ) {}

  async exec(input: SignInDto) {
    // Determine identifier (email or username)
    const identifier = input.email || input.username;
    if (!identifier) {
      throw new UnauthorizedException('Email o username es requerido');
    }

    // Find user by email or username
    const user = await this.users.findByEmailOrUsername(identifier);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verify password hash
    if (user.passwordHash) {
      const isValidPassword = await bcrypt.compare(input.password, user.passwordHash);
      if (!isValidPassword) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
    }

    // Sign in with external auth provider using email
    const session = await this.auth.signIn({ email: user.email, password: input.password });
    
    return {
      ...session,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        rolId: user.rolId,
      }
    };
  }
}
