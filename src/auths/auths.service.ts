import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignUpUseCase } from './application/use-cases/sign-up.usecase';
import { SignInUseCase } from './application/use-cases/sign-in.usecase';
import { CreateUsuarioUseCase } from './application/use-cases/create-usuario.usecase';
import { ValidateEmailUseCase } from './application/use-cases/validate-email.usecase';
import { SignUpDto } from './application/dto/sign-up.dto';
import { SignInDto } from './application/dto/sign-in.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { ValidateEmailDto } from './application/dto/validate-email.dto';

@Injectable()
export class AuthsService {
  constructor(
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signInUseCase: SignInUseCase,
    private readonly createUsuarioUseCase: CreateUsuarioUseCase,
    private readonly validateEmailUseCase: ValidateEmailUseCase,
  ) {}

  // New DDD flows
  signUp(dto: SignUpDto) {
    return this.signUpUseCase.exec(dto);
  }

  signIn(dto: SignInDto) {
    return this.signInUseCase.exec(dto);
  }

  createUsuario(dto: CreateUsuarioDto) {
    return this.createUsuarioUseCase.exec(dto);
  }

  validateEmail(dto: ValidateEmailDto) {
    return this.validateEmailUseCase.exec(dto);
  }

  // Legacy scaffolded methods (kept for compatibility/testing)
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auths`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
