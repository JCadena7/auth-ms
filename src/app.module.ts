import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthsModule } from './auths/auths.module';
import { RbacModule } from './rbac/rbac.module';

@Module({ 
  imports: [DatabaseModule, AuthsModule, RbacModule],
  controllers: [],
})
export class AppModule {}
