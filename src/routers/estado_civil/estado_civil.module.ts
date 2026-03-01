import { Module } from '@nestjs/common';
import { EstadoCivilService } from './estado_civil.service';
import { EstadoCivilController } from './estado_civil.controller';

@Module({
  controllers: [EstadoCivilController],
  providers: [EstadoCivilService],
})
export class EstadoCivilModule {}
