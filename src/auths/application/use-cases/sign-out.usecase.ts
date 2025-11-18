import { Inject, Injectable } from '@nestjs/common';
import { AUTH_PROVIDER } from '../../tokens';
import type { AuthProvider } from '../../domain/services/auth-provider';
import { SignOutDto } from '../dto/sign-out.dto';

@Injectable()
export class SignOutUseCase {
  constructor(
    @Inject(AUTH_PROVIDER)
    private readonly authProvider: AuthProvider,
  ) {}

  async exec(dto: SignOutDto): Promise<{ success: boolean }> {
    await this.authProvider.signOut(dto.accessToken);
    return { success: true };
  }
}
