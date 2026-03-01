import { Injectable } from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { entity_departamento } from './entities/departamento.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DepartamentosService {

  async servicio_dpt_gtt() {

    let o_res = {};
    try {

      const o_obj = await entity_departamento.findAndCountAll({});

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

  async servicio_dpt_ins(s_obj: CreateDepartamentoDto) {

    let o_res = {};
    try {

      const { dpt_dpt_des } = s_obj;
      let o_id = uuidv4();

      const o_obj_a = await entity_departamento.findOne({
        where: {
          dpt_dpt_des: dpt_dpt_des
        }
      });

      if (o_obj_a !== null) {
        return o_res = {
          message: ["Ya existe un registro con esos parámetros"],
          error: "Bad Request",
          statusCode: 400,
        }
      }

      await entity_departamento.create({
        id: o_id,
        dpt_dpt_des: dpt_dpt_des
      })

      const o_obj_d = await entity_departamento.findByPk(o_id);

      return o_res = {
        message: ["Se registró el registro exitosamente"],
        statusCode: 201,
        result: {
          id: o_obj_d.dataValues.id,
          dpt_dpt_des: o_obj_d.dataValues.dpt_dpt_des
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

  async servicio_dpt_mvi(s_obj: { dpt_dpt_odt: CreateDepartamentoDto[] }) {

    let o_res = {};
    const o_users_with_id_s = [];
    const o_users_with_id_n = [];
    let o_cont_s = 0;
    let o_cont_n = 0;

    try {

      const { dpt_dpt_odt } = s_obj;

      if (!Array.isArray(dpt_dpt_odt) || dpt_dpt_odt.length === 0) {
        return {
          message: ['El array no puede estar vacío.'],
          error: "Solicitud incorrecta",
          statusCode: 400,
        };
      }

      for (const reg of dpt_dpt_odt) {

        const o_obj_a = await entity_departamento.findOne({
          where: {
            dpt_dpt_des: reg.dpt_dpt_des
          }
        });

        if (o_obj_a !== null) {
          o_cont_n++;
          o_users_with_id_n.push({
            ...reg,
          });
        } else {
          o_cont_s++;
          o_users_with_id_s.push({
            id: uuidv4(),
            ...reg,
          });
        }
      };

      if (o_users_with_id_s.length > 0) {
        await entity_departamento.bulkCreate(o_users_with_id_s);
      }

      return o_res = {
        message: ["Se registró los registros exitosamente"],
        statusCode: 201,
        result: {
          reg_s: {
            count: o_cont_s,
            rows: o_users_with_id_s
          },
          reg_n: {
            count: o_cont_n,
            rows: o_users_with_id_n
          }
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
