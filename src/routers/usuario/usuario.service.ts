import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { entity_usuario } from './entities/usuario.entity';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Request } from 'express';

class CampoIdDto {
  @IsString({ message: 'El campo "ID" debe ser de tipo string.' })
  @IsNotEmpty({ message: 'El campo "ID" no debe estar vacio.' })
  id: string
}

@Injectable()
export class UsuarioService {

  async servicio_usu_gto(s_obj: CampoIdDto) {

    const { id } = s_obj;

    try {

      const o_obj_a = await entity_usuario.findOne({
        where: {
          id: id
        },
        attributes: {
          exclude: ['usu_usu_pwd', 'usu_usu_aut', 'usu_usu_act', 'usu_usu_cof', 'usu_usu_tdu', 'usu_usu_cod', 'usu_usu_pln']
        }
      });

      if (o_obj_a === null) {
        return {
          message: ["No se encontró ningún registro con ese correo"],
          statusCode: 200,
          result: []
        }
      }

      return {
        message: ["Ya existe un usuario con ese correo"],
        statusCode: 200,
        result: o_obj_a
      }
    } catch (error) {
      return {
        message: [error.message],
        error: "Solicitud incorrecta",
        statusCode: 400
      }
    }
  }

  async servicio_usu_udp(id: string, s_obj: UpdateUsuarioDto) {

    let o_res = {};
    try {

      const o_obj_a = await entity_usuario.findOne({
        where: {
          id: id
        }
      });

      if (o_obj_a === null) {
        return o_res = {
          message: ["No se encontró el registro para actualizar"],
          error: "Not Found",
          statusCode: 404
        }
      }

      await entity_usuario.update({ ...s_obj },
        {
          where: {
            id: id
          }
        });

      const o_obj_d = await entity_usuario.findByPk(id);

      return o_res = {
        message: ["Se actualizó el registro exitosamente"],
        statusCode: 200,
        result: {
          id: o_obj_d.dataValues.id,
          tip_tip_des: o_obj_d.dataValues.tip_tip_des,
        }
      }
    } catch (error) {
      return o_res = {
        message: [error.message],
        error: "Solicitud incorrecta",
        statusCode: 400
      }
    }
  }
}
