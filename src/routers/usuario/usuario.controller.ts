import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpException, Query, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Response } from 'express';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

class CampoIdDto {
  @IsString({ message: 'El campo "ID" debe ser de tipo string.' })
  @IsNotEmpty({ message: 'El campo "ID" no debe estar vacio.' })
  id: string
}

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuario_service: UsuarioService) { }

  @Get('/list-one')
  async controlador_usu_gto(@Body() s_obj: CampoIdDto, @Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.usuario_service.servicio_usu_gto(s_obj);
      res.status(o_response.statusCode);
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }

  @Patch('/update/:id')
  async controlador_tip_udp(@Param('id') id: string, @Body() s_obj: UpdateUsuarioDto, @Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.usuario_service.servicio_usu_udp(id, s_obj);
      res.status(o_response.statusCode);
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }
}
