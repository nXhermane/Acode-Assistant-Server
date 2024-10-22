import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import {AcodeGateway} from "./AcodeGateway"
@Module({
  imports: [],
  controllers: [],
  providers: [ AcodeGateway],
})
export class AppModule {}
