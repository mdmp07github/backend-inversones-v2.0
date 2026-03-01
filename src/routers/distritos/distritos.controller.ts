import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpException, Query, Req } from '@nestjs/common';
import { DistritosService } from './distritos.service';
import { CreateDistritoDto } from './dto/create-distrito.dto';
import { UpdateDistritoDto } from './dto/update-distrito.dto';
import { Response } from 'express';

@Controller('distritos')
export class DistritosController {
  constructor(private readonly distritos_service: DistritosService) { }

  @Get('/list-all')
  async controlador_dis_gtt(@Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.distritos_service.servicio_dis_gtt();
      res.status(o_response.statusCode);
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }

  @Post('/insert')
  async controlador_dis_ins(@Body() s_obj: CreateDistritoDto, @Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.distritos_service.servicio_dis_ins(s_obj);
      res.status(o_response.statusCode)
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }

  @Post('/massive-insert')
  async controlador_dis_mvi(@Body() s_obj: { dis_dis_odt: CreateDistritoDto[] }, @Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.distritos_service.servicio_dis_mvi(s_obj);
      res.status(o_response.statusCode)
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }
}
