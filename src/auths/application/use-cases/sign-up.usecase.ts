import { Inject, Injectable } from '@nestjs/common';
import { AUTH_PROVIDER, USER_REPOSITORY } from '../../tokens';
import type { AuthProvider } from '../../domain/services/auth-provider';
import type { UserRepository } from '../../domain/repositories/user.repository';
import { SignUpDto } from '../dto/sign-up.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SignUpUseCase {
  constructor(
    @Inject(AUTH_PROVIDER) private readonly auth: AuthProvider,
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
  ) {}

  async exec(input: SignUpDto) {
    // Hash password
    const passwordHash = await bcrypt.hash(input.password, 10);

    // Create user in external auth provider (Supabase)
    const { userId } = await this.auth.signUp({ email: input.email, password: input.password });

    // Generate username from email if not provided
    const username = input.username || input.email.split('@')[0];

    // Persist domain user (maps Supabase user id to usuarios.clerk_id)
    const user = await this.users.create({
      externalId: userId,
      username,
      email: input.email,
      passwordHash,
      firstName: input.first_name,
      lastName: input.last_name,
      phone: input.phone,
      rolId: 4, // Default role: comentador
      status: 'active',
      isVerified: false,
    });

    return { 
      userId: user.externalId, 
      email: user.email, 
      username: user.username,
      firstName: user.firstName, 
      lastName: user.lastName 
    };
  }
}
