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
      nombre: input.nombre,
      email: input.email,
      rolId: input.rolId ?? null,
    });
    return { id: user.id, externalId: user.externalId, nombre: user.nombre, email: user.email, rolId: user.rolId };
  }
}
