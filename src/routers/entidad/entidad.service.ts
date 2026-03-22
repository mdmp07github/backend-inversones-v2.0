import { Injectable } from '@nestjs/common';
import { CreateEntidadDto } from './dto/create-entidad.dto';
import { UpdateEntidadDto } from './dto/update-entidad.dto';
import { entity_entidad } from './entities/entidad.entity';
import { entity_usuario } from '../usuario/entities/usuario.entity';
import { v4 as uuidv4 } from 'uuid';
import type { Request } from 'express';
import { Op } from "sequelize";

const o_page = "1";
const o_offset = 0;
const o_limit = 100;

@Injectable()
export class EntidadService {

  async servicio_ent_gtt(s_req: Request) {

    let o_res = {};
    try {

      const o_obj_usu_correo = await entity_usuario.findAll({
        attributes: ['usu_usu_eml'],
        where: {
          id: s_req.user.id
        }
      });

      const o_obj = await entity_entidad.findAndCountAll({
        where: {
          ent_ent_usu: o_obj_usu_correo[0].dataValues.usu_usu_eml
        }
      });

      if (o_obj.count === 0) {
        return o_res = {
          message: ["No se encontró ningún registro"],
          statusCode: 200,
          result: o_obj
        }
      }

      return o_res = {
        message: ["Lista completa de registros"],
        statusCode: 200,
        result: o_obj
      }
    } catch (error) {
      console.log(error)
      return o_res = {
        message: [error.message],
        error: "Solicitud incorrecta",
        statusCode: 400
      }
    }
  }

  async servicio_ent_gtf(s_ent_ent_cod: string, s_ent_ent_nom: string, s_ent_ent_des: string, s_ent_ent_tdv: string, s_ent_ent_pos: string, s_ent_ent_fei: string, s_ent_ent_fef: string, s_ent_ent_ano: string, s_req: Request) {

    let o_res = {};
    try {

      const o_obj_usu_correo = await entity_usuario.findAll({
        attributes: ['usu_usu_eml'],
        where: {
          id: s_req.user.id
        }
      });

      if (!o_obj_usu_correo) {
        return {
          message: ["Usuario no autorizado"],
          statusCode: 401
        };
      }

      let o_condiciones: any = {
        ent_ent_usu: o_obj_usu_correo[0].dataValues.usu_usu_eml
      };

      if (s_ent_ent_cod && s_ent_ent_cod !== "0") {
        o_condiciones.ent_ent_cod = s_ent_ent_cod;
      }

      if (s_ent_ent_nom && s_ent_ent_nom !== "0") {
        o_condiciones.ent_ent_nom = {
          [Op.like]: `%${s_ent_ent_nom}%`
        };
      }

      if (s_ent_ent_des && s_ent_ent_des !== "0") {
        o_condiciones.ent_ent_des = {
          [Op.like]: `%${s_ent_ent_des}%`
        };
      }

      if (s_ent_ent_tdv && s_ent_ent_tdv !== "0") {
        o_condiciones.ent_ent_tdv = s_ent_ent_tdv;
      }

      if (s_ent_ent_pos && s_ent_ent_pos !== "0") {
        o_condiciones.ent_ent_pos = s_ent_ent_pos;
      }

      if (s_ent_ent_fei && s_ent_ent_fei !== "0" && s_ent_ent_fef && s_ent_ent_fef !== "0") {
        o_condiciones.ent_ent_fdr = {
          [Op.between]: [s_ent_ent_fei, s_ent_ent_fef]
        };
      }

      if (s_ent_ent_fei && s_ent_ent_fei !== "0" && s_ent_ent_fef === "0") {
        o_condiciones.ent_ent_fdr = {
          [Op.gte]: s_ent_ent_fei
        };
      }

      if (s_ent_ent_fei === "0" && s_ent_ent_fef && s_ent_ent_fef !== "0") {
        o_condiciones.ent_ent_fdr = {
          [Op.lte]: s_ent_ent_fef
        };
      }

      if (s_ent_ent_ano && s_ent_ent_ano !== "0") {
        o_condiciones.ent_ent_ano = s_ent_ent_ano;
      }

      const o_obj = await entity_entidad.findAndCountAll({
        where: o_condiciones,
        order: [['createdAt', 'DESC']]
      });

      return o_res = {
        message: o_obj.count === 0 ? ["No se encontró ningún registro"] : ["Lista de registros"],
        statusCode: 200,
        result: o_obj
      };

    } catch (error) {
      console.error(error);
      return o_res = {
        message: [error.message],
        error: "Solicitud incorrecta",
        statusCode: 400
      };
    }
  }

  async servicio_ent_gtp(s_page: any, s_records: any, s_req: Request) {

    let o_res = {};
    try {

      const o_obj_usu_correo = await entity_usuario.findAll({
        attributes: ['usu_usu_eml'],
        where: {
          id: s_req.user.id
        }
      });

      if (s_page === undefined && s_records === undefined) {
        const o_obj = await entity_entidad.findAndCountAll({
          where: {
            ent_ent_usu: o_obj_usu_correo[0].dataValues.usu_usu_eml
          },
          offset: o_offset,
          limit: o_limit,
        });

        if (o_obj.count === 0) {
          return o_res = {
            message: ["No se encontró ningún registro"],
            statusCode: 200,
            page: o_page,
            result: o_obj
          }
        }

        return o_res = {
          message: ["Lista parcial de registros"],
          statusCode: 200,
          page: o_page,
          result: o_obj
        }
      } else {
        const o_obj = await entity_entidad.findAndCountAll({
          where: {
            ent_ent_usu: o_obj_usu_correo[0].dataValues.usu_usu_eml
          },
          offset: (parseInt(s_page) - 1) * s_records,
          limit: s_records,
        });

        if (o_obj.count === 0) {
          return o_res = {
            message: ["No se encontró ningún registro"],
            statusCode: 200,
            page: o_page,
            result: o_obj
          }
        }

        return o_res = {
          message: ["Lista parcial de registros"],
          statusCode: 200,
          page: s_page,
          result: o_obj
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

  async servicio_ent_gto(s_id: any, s_req: Request) {

    let o_res = {};
    try {

      const o_obj_usu_correo = await entity_usuario.findAll({
        attributes: ['usu_usu_eml'],
        where: {
          id: s_req.user.id
        }
      });

      const o_obj = await entity_entidad.findAll({
        where: {
          id: s_id,
          ent_ent_usu: o_obj_usu_correo[0].dataValues.usu_usu_eml
        }
      });

      if (o_obj.length === 0) {
        return o_res = {
          message: ["No se encontró ningún registro"],
          statusCode: 200,
          result: o_obj
        }
      }

      return o_res = {
        message: ["Se obtuvo un registro"],
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

  async servicio_ent_cnt(s_req: Request) {

    let o_res = {};
    try {

      const o_obj_usu_correo = await entity_usuario.findAll({
        attributes: ['usu_usu_eml'],
        where: {
          id: s_req.user.id
        }
      });

      const o_ctd = await entity_entidad.count({
        where: {
          ent_ent_usu: o_obj_usu_correo[0].dataValues.usu_usu_eml
        }
      });

      return o_res = {
        message: ["Cantidad total de registros"],
        statusCode: 200,
        result: {
          total: o_ctd
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

  async servicio_ent_ins(s_obj: CreateEntidadDto, s_req: Request) {

    let o_res = {};
    try {

      const { ent_ent_cod, ent_ent_nom, ent_ent_des, ent_ent_tdv, ent_ent_pos, ent_ent_val, ent_ent_fdr, ent_ent_hdr, ent_ent_ano } = s_obj;
      let o_id = uuidv4();

      const o_obj_usu_correo = await entity_usuario.findAll({
        attributes: ['usu_usu_eml'],
        where: {
          id: s_req.user.id
        }
      });

      /* const o_obj_a = await entity_entidad.findAll({
        where: {
          ent_ent_des: ent_ent_des,
          ent_ent_usu: s_req.user.id
        }
      }); */

      /* if (o_obj_a.length !== 0) {
        return o_res = {
          message: ["Ya existe un registro con esos parámetros"],
          error: "Bad Request",
          statusCode: 400,
        }
      } */

      await entity_entidad.create({
        id: o_id,
        ent_ent_cod: ent_ent_cod,
        ent_ent_nom: ent_ent_nom,
        ent_ent_des: ent_ent_des,
        ent_ent_tdv: ent_ent_tdv,
        ent_ent_pos: ent_ent_pos,
        ent_ent_val: ent_ent_val,
        ent_ent_fdr: ent_ent_fdr,
        ent_ent_hdr: ent_ent_hdr,
        ent_ent_ano: ent_ent_ano,
        ent_ent_usu: o_obj_usu_correo[0].dataValues.usu_usu_eml
      })

      const o_obj_d = await entity_entidad.findByPk(o_id);

      if (!o_obj_d) {
        return o_res = {
          message: ["Error al recuperar el registro creado"],
          error: "Internal Server Error",
          statusCode: 500
        }
      }

      return o_res = {
        message: ["Se registró el registro exitosamente"],
        statusCode: 201,
        result: {
          id: o_obj_d.dataValues.id,
          ent_ent_cod: o_obj_d.dataValues.ent_ent_cod,
          ent_ent_nom: o_obj_d.dataValues.ent_ent_nom,
          ent_ent_des: o_obj_d.dataValues.ent_ent_des,
          ent_ent_tdv: o_obj_d.dataValues.ent_ent_tdv,
          ent_ent_pos: o_obj_d.dataValues.ent_ent_pos,
          ent_ent_val: o_obj_d.dataValues.ent_ent_val,
          ent_ent_fdr: o_obj_d.dataValues.ent_ent_fdr,
          ent_ent_hdr: o_obj_d.dataValues.ent_ent_hdr,
          ent_ent_ano: o_obj_d.dataValues.ent_ent_ano,
          ent_ent_usu: o_obj_d.dataValues.ent_ent_usu
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

  async servicio_ent_upd(id: string, s_obj: UpdateEntidadDto, s_req: Request) {

    let o_res = {};
    try {

      const o_obj_usu_correo = await entity_usuario.findAll({
        attributes: ['usu_usu_eml'],
        where: {
          id: s_req.user.id
        }
      });

      const o_obj_b = await entity_entidad.findAll({
        where: {
          id: id,
          ent_ent_usu: o_obj_usu_correo[0].dataValues.usu_usu_eml
        }
      });

      if (o_obj_b.length === 0) {
        return o_res = {
          message: ["No se encontró el registro para actualizar"],
          error: "Not Found",
          statusCode: 404
        }
      }

      await entity_entidad.update({ ...s_obj },
        {
          where: {
            id: id,
            ent_ent_usu: o_obj_usu_correo[0].dataValues.usu_usu_eml
          }
        });

      const o_obj_d = await entity_entidad.findByPk(id);

      if (!o_obj_d) {
        return o_res = {
          message: ["Error al recuperar el registro actualizado"],
          error: "Internal Server Error",
          statusCode: 500
        }
      }

      return o_res = {
        message: ["Se actualizó el registro exitosamente"],
        statusCode: 200,
        result: {
          id: o_obj_d.dataValues.id,
          ent_ent_cod: o_obj_d.dataValues.ent_ent_cod,
          ent_ent_nom: o_obj_d.dataValues.ent_ent_nom,
          ent_ent_des: o_obj_d.dataValues.ent_ent_des,
          ent_ent_tdv: o_obj_d.dataValues.ent_ent_tdv,
          ent_ent_pos: o_obj_d.dataValues.ent_ent_pos,
          ent_ent_val: o_obj_d.dataValues.ent_ent_val,
          ent_ent_fdr: o_obj_d.dataValues.ent_ent_fdr,
          ent_ent_hdr: o_obj_d.dataValues.ent_ent_hdr,
          ent_ent_ano: o_obj_d.dataValues.ent_ent_ano,
          ent_ent_usu: o_obj_d.dataValues.ent_ent_usu
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

  async servicio_ent_del(id: string, s_req: Request) {

    let o_res = {};
    try {

      const o_obj_usu_correo = await entity_usuario.findAll({
        attributes: ['usu_usu_eml'],
        where: {
          id: s_req.user.id
        }
      });

      const o_obj_a = await entity_entidad.findAll({
        where: {
          id: id,
          ent_ent_usu: o_obj_usu_correo[0].dataValues.usu_usu_eml
        }
      });

      if (o_obj_a.length === 0) {
        return o_res = {
          message: ["No se encontró el registro para eliminar"],
          error: "Not Found",
          statusCode: 404
        }
      }

      await entity_entidad.destroy({
        where: {
          id: id,
          ent_ent_usu: o_obj_usu_correo[0].dataValues.usu_usu_eml
        }
      })

      return o_res = {
        message: ["Se eliminó el registro exitosamente"],
        statusCode: 200,
        result: {
          id: id
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
