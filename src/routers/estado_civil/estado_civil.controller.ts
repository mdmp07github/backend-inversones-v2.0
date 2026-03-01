import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpException, Query, Req } from '@nestjs/common';
import { EstadoCivilService } from './estado_civil.service';
import { CreateEstadoCivilDto } from './dto/create-estado_civil.dto';
import { UpdateEstadoCivilDto } from './dto/update-estado_civil.dto';
import { Response } from 'express';

@Controller('estado-civil')
export class EstadoCivilController {
  constructor(private readonly estado_civil_service: EstadoCivilService) { }

  @Get('/list-all')
  async controlador_esc_gtt(@Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.estado_civil_service.servicio_esc_gtt();
      res.status(o_response.statusCode);
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }

  @Post('/insert')
  async controlador_esc_ins(@Body() s_obj: CreateEstadoCivilDto, @Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.estado_civil_service.servicio_esc_ins(s_obj);
      res.status(o_response.statusCode)
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }

  @Post('/massive-insert')
  async controlador_esc_mvi(@Body() s_obj: { esc_esc_odt: CreateEstadoCivilDto[] }, @Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.estado_civil_service.servicio_esc_mvi(s_obj);
      res.status(o_response.statusCode)
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }
}
