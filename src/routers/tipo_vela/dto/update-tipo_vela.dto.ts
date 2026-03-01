import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoVelaDto } from './create-tipo_vela.dto';

export class UpdateTipoVelaDto extends PartialType(CreateTipoVelaDto) {}
