import { Injectable, Inject } from '@nestjs/common';
import type { UserRepository } from '../../domain/repositories/user.repository';
import type { ValidateEmailDto } from '../dto/validate-email.dto';
import { USER_REPOSITORY } from '../../tokens';

@Injectable()
export class ValidateEmailUseCase {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: UserRepository) {}

  async exec(dto: ValidateEmailDto): Promise<{ exists: boolean; message: string }> {
    const user = await this.userRepository.findByEmail(dto.email);
    
    if (user) {
      return {
        exists: true,
        message: 'El email ya está registrado',
      };
    }

    return {
      exists: false,
      message: 'El email está disponible',
    };
  }
}
