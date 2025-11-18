import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../tokens';
import type { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUsuarioDto } from '../../dto/create-usuario.dto';

@Injectable()
export class CreateUsuarioUseCase {
  constructor(@Inject(USER_REPOSITORY) private readonly users: UserRepository) {}

  async exec(input: CreateUsuarioDto) {
    const user = await this.users.create({
      externalId: input.externalId ?? null,
      username: input.username ?? null,
      email: input.email,
      passwordHash: input.passwordHash ?? null,
      firstName: input.firstName,
      lastName: input.lastName,
      rolId: input.rolId ?? null,
      phone: input.phone ?? null,
      avatar: input.avatar ?? null,
      bio: input.bio ?? null,
      status: input.status ?? 'active',
      isVerified: input.isVerified ?? false,
    });
    
    return { 
      id: user.id, 
      externalId: user.externalId, 
      username: user.username,
      email: user.email, 
      firstName: user.firstName,
      lastName: user.lastName,
      rolId: user.rolId,
      status: user.status,
      isVerified: user.isVerified,
    };
  }
}
