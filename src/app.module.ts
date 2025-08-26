import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthsModule } from './auths/auths.module';

@Module({ 
  imports: [DatabaseModule, AuthsModule],
  controllers: [],
})
export class AppModule {}
