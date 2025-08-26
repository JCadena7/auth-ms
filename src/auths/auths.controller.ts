import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthsService } from './auths.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignUpDto } from './application/dto/sign-up.dto';
import { SignInDto } from './application/dto/sign-in.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller()
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @MessagePattern('createAuth')
  create(@Payload() createAuthDto: CreateAuthDto) {
    return this.authsService.create(createAuthDto);
  }

  @MessagePattern('findAllAuths')
  findAll() {
    return this.authsService.findAll();
  }

  @MessagePattern('findOneAuth')
  findOne(@Payload() id: number) {
    return this.authsService.findOne(id);
  }

  @MessagePattern('updateAuth')
  update(@Payload() updateAuthDto: UpdateAuthDto) {
    return this.authsService.update(updateAuthDto.id, updateAuthDto);
  }

  @MessagePattern('removeAuth')
  remove(@Payload() id: number) {
    return this.authsService.remove(id);
  }

  // New DDD auth flows (Supabase)
  @MessagePattern('auth.signUp')
  signUp(@Payload() dto: SignUpDto) {
    return this.authsService.signUp(dto);
  }

  @MessagePattern('auth.signIn')
  signIn(@Payload() dto: SignInDto) {
    return this.authsService.signIn(dto);
  }

  // Usuarios
  @MessagePattern('usuarios.create')
  createUsuario(@Payload() dto: CreateUsuarioDto) {
    return this.authsService.createUsuario(dto);
  }
}
