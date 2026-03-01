import { Injectable } from '@nestjs/common';
import { CreateTipoVelaDto } from './dto/create-tipo_vela.dto';
import { UpdateTipoVelaDto } from './dto/update-tipo_vela.dto';

@Injectable()
export class TipoVelaService {
  create(createTipoVelaDto: CreateTipoVelaDto) {
    return 'This action adds a new tipoVela';
  }

  findAll() {
    return `This action returns all tipoVela`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoVela`;
  }

  update(id: number, updateTipoVelaDto: UpdateTipoVelaDto) {
    return `This action updates a #${id} tipoVela`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoVela`;
  }
}
