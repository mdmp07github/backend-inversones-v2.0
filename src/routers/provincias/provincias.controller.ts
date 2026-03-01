import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpException, Query, Req } from '@nestjs/common';
import { ProvinciasService } from './provincias.service';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { UpdateProvinciaDto } from './dto/update-provincia.dto';
import { Response } from 'express';

@Controller('provincias')
export class ProvinciasController {
  constructor(private readonly provincias_service: ProvinciasService) { }

  @Get('/list-all')
  async controlador_pvc_gtt(@Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.provincias_service.servicio_pvc_gtt();
      res.status(o_response.statusCode);
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }

  @Post('/insert')
  async controlador_pvc_ins(@Body() s_obj: CreateProvinciaDto, @Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.provincias_service.servicio_pvc_ins(s_obj);
      res.status(o_response.statusCode)
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }

  @Post('/massive-insert')
  async controlador_pvc_mvi(@Body() s_obj: { pvc_pvc_odt: CreateProvinciaDto[] }, @Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.provincias_service.servicio_pvc_mvi(s_obj);
      res.status(o_response.statusCode)
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }
}
