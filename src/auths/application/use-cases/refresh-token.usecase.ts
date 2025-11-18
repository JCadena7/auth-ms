import { Inject, Injectable } from '@nestjs/common';
import { AUTH_PROVIDER } from '../../tokens';
import type { AuthProvider } from '../../domain/services/auth-provider';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    @Inject(AUTH_PROVIDER)
    private readonly authProvider: AuthProvider,
  ) {}

  async exec(dto: RefreshTokenDto) {
    return this.authProvider.refresh(dto.refreshToken);
  }
}
