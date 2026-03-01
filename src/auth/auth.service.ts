import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { entity_usuario } from '../routers/usuario/entities/usuario.entity';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken'
import { TokenAuthDto } from './dto/token-auth.dto';
import * as nodemailer from 'nodemailer'
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { EmailAuthDto } from './dto/email-auth.dto';
import { VerificarCodigoAuthDto } from './dto/verificar-codigo-auth.dto';
import { RestablecerPasswordAuthDto } from './dto/rest-password-auth.dto';

class CampoEmailDto {
  @MaxLength(50, { message: 'El campo "Email" debe tener máximo 50 carácteres.' })
  @IsString({ message: 'El campo "Email" debe ser de tipo string.' })
  @IsNotEmpty({ message: 'El campo "Email" no debe estar vacio.' })
  usu_usu_eml: string
}

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService
  ) { }

  async servicio_ath_lgn(s_obj: LoginAuthDto) {

    try {

      const o_obj_a = await entity_usuario.findOne({
        where: {
          usu_usu_eml: s_obj.usu_usu_eml
        }
      });

      if (!o_obj_a) {
        return {
          message: ["El usuario con ese correo no se encuentra registrado en el sistema"],
          error: "Not Found",
          statusCode: 404,
        }
      }

      const o_password_comparar = await bcrypt.compare(s_obj.usu_usu_pwd, o_obj_a.dataValues.usu_usu_pwd);

      if (!o_password_comparar) {
        return {
          message: ["La contraseña es incorrecta"],
          error: "Bad Request",
          statusCode: 400,
        }
      }

      const o_payload = {
        id: o_obj_a.dataValues.id,
        usu_usu_urn: o_obj_a.dataValues.usu_usu_urn,
        usu_usu_ura: o_obj_a.dataValues.usu_usu_ura,
        usu_usu_eml: o_obj_a.dataValues.usu_usu_eml
      };
      const o_token = await this.jwtService.signAsync(o_payload);

      return {
        message: ["Usuario logueado"],
        statusCode: 200,
        result: {
          id: o_obj_a.dataValues.id,
          usu_usu_urn: o_obj_a.dataValues.usu_usu_urn,
          usu_usu_ura: o_obj_a.dataValues.usu_usu_ura,
          usu_usu_eml: o_obj_a.dataValues.usu_usu_eml,
          usu_usu_crt: o_obj_a.dataValues.createdAt,
          usu_usu_upd: o_obj_a.dataValues.updatedAt,
          token: o_token
        }
      }
    } catch (error) {
      return {
        message: [error.message],
        error: "Solicitud incorrecta",
        statusCode: 400
      }
    }
  }

  async servicio_ath_vrf(s_req: any, s_obj: TokenAuthDto) {

    try {

      const { usu_usu_tkn } = s_obj;
      const { token } = s_req.cookies;

      if (usu_usu_tkn !== token) {
        return {
          message: ['No está autorizado'],
          error: "Unauthorized",
          statusCode: 401
        }
      }

      if (!token) {
        return {
          message: ['No está autorizado'],
          error: "Unauthorized",
          statusCode: 401
        }
      }

      const o_jwt = await jwt.verify(token, process.env.POSTGRES_SECRET, async (err: any, user: any) => {
        if (err) {
          return {
            message: ['No está autorizado'],
            error: "Unauthorized",
            statusCode: 401
          }
        }

        let o_user = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        const o_user_found = await entity_usuario.findByPk(o_user.id);
        if (!o_user_found) {
          return {
            message: ['No está autorizado'],
            error: "Unauthorized",
            statusCode: 401
          }
        }

        return {
          message: ["Se obtuvo un usuario"],
          statusCode: 200,
          result: {
            id: o_user_found.dataValues.id,
            usu_usu_urn: o_user_found.dataValues.usu_usu_urn,
            usu_usu_ura: o_user_found.dataValues.usu_usu_ura,
            usu_usu_eml: o_user_found.dataValues.usu_usu_eml,
            usu_usu_crt: o_user_found.dataValues.createdAt,
            usu_usu_upd: o_user_found.dataValues.updatedAt,
          }
        }
      })

      return {
        message: JSON.parse(JSON.stringify(o_jwt)).message,
        statusCode: JSON.parse(JSON.stringify(o_jwt)).statusCode,
        result: JSON.parse(JSON.stringify(o_jwt)).result
      }

    } catch (error) {
      return {
        message: [error.message],
        error: "Solicitud incorrecta",
        statusCode: 400
      }
    }
  }

  async servicio_ath_reg(s_obj: RegisterAuthDto) {

    try {

      const { usu_usu_urn, usu_usu_ura, usu_usu_eml, usu_usu_pwd } = s_obj;
      let o_id = uuidv4();

      const o_total_usuario = await entity_usuario.count();

      let o_tdu = "V"
      if (o_total_usuario === 0) {
        o_tdu = "A"
      }

      const o_obj_a = await entity_usuario.findOne({
        where: {
          usu_usu_eml: usu_usu_eml
        }
      });

      if (o_obj_a !== null) {
        return {
          message: ["Ya existe un usuario con ese correo"],
          error: "Bad Request",
          statusCode: 400,
        }
      }

      const o_hashs = await bcrypt.hash(usu_usu_pwd, 10);

      await entity_usuario.create({
        id: o_id,
        usu_usu_urn: usu_usu_urn,
        usu_usu_ura: usu_usu_ura,
        usu_usu_eml: usu_usu_eml,
        usu_usu_pwd: o_hashs,
        usu_usu_tdu: o_tdu
      })

      const o_obj_d = await entity_usuario.findByPk(o_id);

      const o_payload = { id: o_id };
      const o_token = await this.jwtService.signAsync(o_payload);

      return {
        message: ["Se registró el usuario exitosamente"],
        statusCode: 201,
        result: {
          id: o_obj_d.dataValues.id,
          usu_usu_urn: o_obj_d.dataValues.usu_usu_urn,
          usu_usu_ura: o_obj_d.dataValues.usu_usu_ura,
          usu_usu_eml: o_obj_d.dataValues.usu_usu_eml,
          usu_usu_crt: o_obj_d.dataValues.createdAt,
          usu_usu_upd: o_obj_d.dataValues.updatedAt,
          token: o_token
        }
      }
    } catch (error) {
      return {
        message: [error.message],
        error: "Solicitud incorrecta",
        statusCode: 400
      }
    }
  }

  async servicio_ath_gto(s_obj: CampoEmailDto) {

    const { usu_usu_eml } = s_obj;

    try {

      const o_obj_a = await entity_usuario.findOne({
        where: {
          usu_usu_eml: usu_usu_eml
        },
        attributes: {
          exclude: ['usu_usu_pwd', 'usu_usu_aut', 'usu_usu_act', 'usu_usu_cof', 'usu_usu_tdu']
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

  async servicio_ath_pfl(s_obj: any) {

    try {

      const o_obj_a = await entity_usuario.findOne({
        where: {
          id: s_obj.user.id
        },
        attributes: {
          exclude: ['usu_usu_pwd', 'usu_usu_aut', 'usu_usu_act', 'usu_usu_cof', 'usu_usu_tdu', 'usu_usu_cod', 'usu_usu_pln']
        }
      });

      return {
        message: ["Se obtuvo un usuario"],
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

  async servicio_ath_eml(s_obj: EmailAuthDto) {

    const { id, usu_usu_cod } = s_obj;

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.POSTGRES_EMAIL_HOST,
        port: 587,
        secure: false,
        auth: {
          user: process.env.POSTGRES_EMAIL_USER,
          pass: process.env.POSTGRES_EMAIL_PASS,
        },
        tls: {
          ciphers: 'SSLv3'
        }
      });

      const info = await transporter.sendMail({
        from: '"Soporte" <' + process.env.POSTGRES_EMAIL_USER + '>',
        to: s_obj.usu_usu_rct,
        subject: s_obj.usu_usu_ast,
        text: s_obj.usu_usu_txt,
        html: s_obj.usu_usu_msn,
      });

      let o_obj_update = {
        usu_usu_cod: usu_usu_cod,
        usu_usu_cof: "N"
      }

      await entity_usuario.update(o_obj_update,
        {
          where: {
            id: id
          }
        });

      return {
        message: ["Se envió correo satisfactoriamente."],
        statusCode: 200,
        result: info
      }

    } catch (error) {
      return {
        message: [error.message],
        error: "Solicitud envío incorrecta",
        statusCode: 400
      }
    }
  }

  async servicio_ath_vrc(s_obj: VerificarCodigoAuthDto) {

    try {

      const { usu_usu_eml, usu_usu_cod } = s_obj;

      const o_obj_a = await entity_usuario.findOne({
        where: {
          usu_usu_eml: usu_usu_eml
        }
      });

      if (usu_usu_cod !== o_obj_a.dataValues.usu_usu_cod) {
        return {
          message: ["El código de verificación es incorrecta."],
          error: "Solicitud envío incorrecta",
          statusCode: 400
        }
      }

      let o_obj_update = {
        usu_usu_cof: "S"
      }

      await entity_usuario.update(o_obj_update,
        {
          where: {
            id: o_obj_a.dataValues.id
          }
        });

      return {
        message: ["El código de verificación es correcta."],
        statusCode: 200,
        result: {
          id: o_obj_a.dataValues.id,
          usu_usu_eml: o_obj_a.dataValues.usu_usu_eml,
        }
      }

    } catch (error) {
      return {
        message: [error.message],
        error: "Solicitud envío incorrecta",
        statusCode: 400
      }
    }
  }

  async servicio_ath_rsp(s_obj: RestablecerPasswordAuthDto) {

    try {

      const { usu_usu_eml, usu_usu_pwd } = s_obj;

      const o_obj_a = await entity_usuario.findOne({
        where: {
          usu_usu_eml: usu_usu_eml
        }
      });

      const o_hashs = await bcrypt.hash(usu_usu_pwd, 10);

      let o_obj_update = {
        usu_usu_pwd: o_hashs,
        usu_usu_aut: "S"
      }

      await entity_usuario.update(o_obj_update,
        {
          where: {
            id: o_obj_a.dataValues.id
          }
        });

      return {
        message: ["Se actualizó correctamente la contraseña."],
        statusCode: 200,
        result: {
          id: o_obj_a.dataValues.id,
          usu_usu_eml: o_obj_a.dataValues.usu_usu_eml,
        }
      }

    } catch (error) {
      return {
        message: [error.message],
        error: "Solicitud envío incorrecta",
        statusCode: 400
      }
    }
  }
}
