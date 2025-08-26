import { Inject, Injectable } from '@nestjs/common';
import { AUTH_PROVIDER } from '../../tokens';
import type { AuthProvider } from '../../domain/services/auth-provider';
import { SignInDto } from '../dto/sign-in.dto';

@Injectable()
export class SignInUseCase {
  constructor(@Inject(AUTH_PROVIDER) private readonly auth: AuthProvider) {}

  async exec(input: SignInDto) {
    const session = await this.auth.signIn({ email: input.email, password: input.password });
    return session; // contains accessToken, refreshToken, userId
  }
}
