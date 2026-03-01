import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpException, Query, Req } from '@nestjs/common';
import { DepartamentosService } from './departamentos.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { Response } from 'express';

@Controller('departamentos')
export class DepartamentosController {
  constructor(private readonly departamentos_service: DepartamentosService) { }

  @Get('/list-all')
  async controlador_dpt_gtt(@Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.departamentos_service.servicio_dpt_gtt();
      res.status(o_response.statusCode);
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }

  @Post('/insert')
  async controlador_dpt_ins(@Body() s_obj: CreateDepartamentoDto, @Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.departamentos_service.servicio_dpt_ins(s_obj);
      res.status(o_response.statusCode)
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }

  @Post('/massive-insert')
  async controlador_dpt_mvi(@Body() s_obj: { dpt_dpt_odt: CreateDepartamentoDto[] }, @Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.departamentos_service.servicio_dpt_mvi(s_obj);
      res.status(o_response.statusCode)
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }
}
