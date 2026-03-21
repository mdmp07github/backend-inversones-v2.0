import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpException, Query, Put, Req } from '@nestjs/common';
import { EntidadService } from './entidad.service';
import { CreateEntidadDto } from './dto/create-entidad.dto';
import { UpdateEntidadDto } from './dto/update-entidad.dto';
import type { Request, Response } from 'express';

@Controller('entidad')
export class EntidadController {
  constructor(private readonly entidad_service: EntidadService) { }

  @Get('/list-all')
  async controlador_ent_gtt(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.entidad_service.servicio_ent_gtt(req);
      res.status(o_response.statusCode);
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }

  @Get('/list-page')
  async controlador_ent_gtp(@Req() req: Request, @Query('page') page: any, @Query('records') records: any, @Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.entidad_service.servicio_ent_gtp(page, records, req);
      res.status(o_response.statusCode);
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }

  @Get('/list-one/:id')
  async controlador_ent_gto(@Req() req: Request, @Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.entidad_service.servicio_ent_gto(id, req);
      res.status(o_response.statusCode);
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }

  @Get('/count')
  async controlador_ent_cnt(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.entidad_service.servicio_ent_cnt(req);
      res.status(o_response.statusCode);
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }

  @Post('/insert')
  async controlador_ent_ins(@Req() req: Request, @Body() s_obj: CreateEntidadDto, @Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.entidad_service.servicio_ent_ins(s_obj, req);
      res.status(o_response.statusCode)
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }

  @Patch('/update/:id')
  async controlador_ent_upd(@Param('id') id: string, @Body() s_obj: UpdateEntidadDto, @Res({ passthrough: true }) res: Response, @Req() req: Request) {
    try {
      const o_response = await this.entidad_service.servicio_ent_upd(id, s_obj, req);
      res.status(o_response.statusCode);
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }

  @Delete('/delete/:id')
  async controlador_ent_del(@Req() req: Request, @Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.entidad_service.servicio_ent_del(id, req);
      res.status(o_response.statusCode);
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }

  @Get('/list-filter/:P1/:P2/:P3/:P4/:P5/:P6/:P7/:P8')
  async controlador_ent_gtf(
    @Req() req: Request, 
    @Param('P1') ent_ent_cod: string,
    @Param('P2') ent_ent_nom: string,
    @Param('P3') ent_ent_des: string,
    @Param('P4') ent_ent_tdv: string,
    @Param('P5') ent_ent_pos: string,
    @Param('P6') ent_ent_fei: string,
    @Param('P7') ent_ent_fef: string,
    @Param('P8') ent_ent_ano: string,
    @Res({ passthrough: true }) res: Response
  ) {
    try {
      const o_response = await this.entidad_service.servicio_ent_gtf(ent_ent_cod, ent_ent_nom, ent_ent_des, ent_ent_tdv, ent_ent_pos, ent_ent_fei, ent_ent_fef, ent_ent_ano, req);
      res.status(o_response.statusCode);
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }
}
