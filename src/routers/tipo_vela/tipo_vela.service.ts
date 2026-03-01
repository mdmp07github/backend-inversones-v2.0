import { Injectable } from '@nestjs/common';
import { CreateTipoVelaDto } from './dto/create-tipo_vela.dto';
import { UpdateTipoVelaDto } from './dto/update-tipo_vela.dto';
import { entity_tipo_vela } from './entities/tipo_vela.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TipoVelaService {

  async servicio_tdv_gtt() {

    let o_res = {};
    try {

      const o_obj = await entity_tipo_vela.findAndCountAll({});

      if (o_obj.count === 0) {
        return o_res = {
          message: ["No se encontró ningún registro"],
          statusCode: 200,
          result: []
        }
      }

      return o_res = {
        message: ["Lista completa de registros"],
        statusCode: 200,
        result: o_obj
      }
    } catch (error) {
      return o_res = {
        message: [error.message],
        error: "Solicitud incorrecta",
        statusCode: 400
      }
    }
  }

  async servicio_tdv_ins(s_obj: CreateTipoVelaDto) {

    let o_res = {};
    try {

      const { tdv_tdv_cod, tdv_tdv_des, tdv_tdv_sbl, tdv_tdv_col, tdv_tdv_prd } = s_obj;
      let o_id = uuidv4();

      const o_obj_a = await entity_tipo_vela.findOne({
        where: {
          tdv_tdv_cod: tdv_tdv_cod
        }
      });

      if (o_obj_a !== null) {
        return o_res = {
          message: ["Ya existe un registro con esos parámetros"],
          error: "Bad Request",
          statusCode: 400,
        }
      }

      await entity_tipo_vela.create({
        id: o_id,
        tdv_tdv_cod: tdv_tdv_cod,
        tdv_tdv_des: tdv_tdv_des,
        tdv_tdv_sbl: tdv_tdv_sbl,
        tdv_tdv_col: tdv_tdv_col,
        tdv_tdv_prd: s_obj.tdv_tdv_prd
      })

      const o_obj_d = await entity_tipo_vela.findByPk(o_id);

      return o_res = {
        message: ["Se registró el registro exitosamente"],
        statusCode: 201,
        result: {
          id: o_obj_d.dataValues.id,
          tdv_tdv_cod: o_obj_d.dataValues.tdv_tdv_cod,
          tdv_tdv_des: o_obj_d.dataValues.tdv_tdv_des,
          tdv_tdv_sbl: o_obj_d.dataValues.tdv_tdv_sbl,
          tdv_tdv_col: o_obj_d.dataValues.tdv_tdv_col,
          tdv_tdv_prd: o_obj_d.dataValues.tdv_tdv_prd
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
