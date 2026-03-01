import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoCivilDto } from './create-estado_civil.dto';

export class UpdateEstadoCivilDto extends PartialType(CreateEstadoCivilDto) {}
