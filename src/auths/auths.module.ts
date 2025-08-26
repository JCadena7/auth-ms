import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { AUTH_PROVIDER, USER_REPOSITORY } from './tokens';
import { createAuthProvider } from './infrastructure/supabase/auth-provider.factory';
import { PgUserRepository } from './infrastructure/repositories/pg-user.repository';
import { SignUpUseCase } from './application/use-cases/sign-up.usecase';
import { SignInUseCase } from './application/use-cases/sign-in.usecase';
import { CreateUsuarioUseCase } from './application/use-cases/create-usuario.usecase';

@Module({
  controllers: [AuthsController],
  providers: [
    AuthsService,
    // Factory for Auth provider (Supabase)
    { provide: AUTH_PROVIDER, useFactory: () => createAuthProvider('supabase') },
    // User repository
    { provide: USER_REPOSITORY, useClass: PgUserRepository },
    // Use cases
    SignUpUseCase,
    SignInUseCase,
    CreateUsuarioUseCase,
  ],
})
export class AuthsModule {}
