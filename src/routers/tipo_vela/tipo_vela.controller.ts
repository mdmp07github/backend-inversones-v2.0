import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoVelaService } from './tipo_vela.service';
import { CreateTipoVelaDto } from './dto/create-tipo_vela.dto';
import { UpdateTipoVelaDto } from './dto/update-tipo_vela.dto';

@Controller('tipo-vela')
export class TipoVelaController {
  constructor(private readonly tipoVelaService: TipoVelaService) {}

  @Post()
  create(@Body() createTipoVelaDto: CreateTipoVelaDto) {
    return this.tipoVelaService.create(createTipoVelaDto);
  }

  @Get()
  findAll() {
    return this.tipoVelaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoVelaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoVelaDto: UpdateTipoVelaDto) {
    return this.tipoVelaService.update(+id, updateTipoVelaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoVelaService.remove(+id);
  }
}
