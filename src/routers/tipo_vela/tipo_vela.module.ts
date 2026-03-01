import { Module } from '@nestjs/common';
import { TipoVelaService } from './tipo_vela.service';
import { TipoVelaController } from './tipo_vela.controller';

@Module({
  controllers: [TipoVelaController],
  providers: [TipoVelaService],
})
export class TipoVelaModule {}
