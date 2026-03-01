import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpException, Query, Req } from '@nestjs/common';
import { TipoVelaService } from './tipo_vela.service';
import { CreateTipoVelaDto } from './dto/create-tipo_vela.dto';
import { UpdateTipoVelaDto } from './dto/update-tipo_vela.dto';
import { Response } from 'express';

@Controller('tipo-vela')
export class TipoVelaController {
  constructor(private readonly tipo_vela_service: TipoVelaService) { }

  @Get('/list-all')
  async controlador_tdv_gtt(@Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.tipo_vela_service.servicio_tdv_gtt();
      res.status(o_response.statusCode);
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }

  @Post('/insert')
  async controlador_tdv_ins(@Body() s_obj: CreateTipoVelaDto, @Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.tipo_vela_service.servicio_tdv_ins(s_obj);
      res.status(o_response.statusCode)
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }
}
