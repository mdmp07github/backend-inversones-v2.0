import { Injectable } from '@nestjs/common';
import { CreateDistritoDto } from './dto/create-distrito.dto';
import { UpdateDistritoDto } from './dto/update-distrito.dto';
import { entity_distrito } from './entities/distrito.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DistritosService {

  async servicio_dis_gtt() {

    let o_res = {};
    try {

      const o_obj = await entity_distrito.findAndCountAll({});

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

  async servicio_dis_ins(s_obj: CreateDistritoDto) {

    let o_res = {};
    try {

      const { dis_dis_des, dis_pvc_cod } = s_obj;
      let o_id = uuidv4();

      const o_obj_a = await entity_distrito.findOne({
        where: {
          dis_dis_des: dis_dis_des
        }
      });

      if (o_obj_a !== null) {
        return o_res = {
          message: ["Ya existe un registro con esos parámetros"],
          error: "Bad Request",
          statusCode: 400,
        }
      }

      await entity_distrito.create({
        id: o_id,
        dis_dis_des: dis_dis_des,
        dis_pvc_cod: dis_pvc_cod
      })

      const o_obj_d = await entity_distrito.findByPk(o_id);

      return o_res = {
        message: ["Se registró el registro exitosamente"],
        statusCode: 201,
        result: {
          id: o_obj_d.dataValues.id,
          dis_dis_des: o_obj_d.dataValues.dis_dis_des,
          dis_pvc_cod: o_obj_d.dataValues.dis_pvc_cod
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

  async servicio_dis_mvi(s_obj: { dis_dis_odt: CreateDistritoDto[] }) {

    let o_res = {};
    const o_users_with_id_s = [];
    const o_users_with_id_n = [];
    let o_cont_s = 0;
    let o_cont_n = 0;

    try {

      const { dis_dis_odt } = s_obj;

      if (!Array.isArray(dis_dis_odt) || dis_dis_odt.length === 0) {
        return {
          message: ['El array no puede estar vacío.'],
          error: "Solicitud incorrecta",
          statusCode: 400,
        };
      }

      for (const reg of dis_dis_odt) {

        const o_obj_a = await entity_distrito.findOne({
          where: {
            dis_dis_des: reg.dis_dis_des
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
        await entity_distrito.bulkCreate(o_users_with_id_s);
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
