import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user/user.module';
import { ArtistModule } from './artists/artist/artist.module';

@Module({
  imports: [UserModule, ArtistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
