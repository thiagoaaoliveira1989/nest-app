import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/users.module';
import { MusicModule } from './modules/music/music.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UserModule, MusicModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
