import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpException, Query, Put, Req } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { EmailAuthDto } from './dto/email-auth.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { TokenAuthDto } from './dto/token-auth.dto';
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { VerificarCodigoAuthDto } from './dto/verificar-codigo-auth.dto';
import { RestablecerPasswordAuthDto } from './dto/rest-password-auth.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

class CampoEmailDto {
  @MaxLength(50, { message: 'El campo "Email" debe tener máximo 50 carácteres.' })
  @IsString({ message: 'El campo "Email" debe ser de tipo string.' })
  @IsNotEmpty({ message: 'El campo "Email" no debe estar vacio.' })
  usu_usu_eml: string
}

@SkipThrottle()
@Controller('auth')
export class AuthController {
  constructor(private readonly auth_service: AuthService) { }

  @SkipThrottle({ default: false })
  @Throttle({
    default: { limit: 5, ttl: 10000 },
    short: { limit: 5, ttl: 10000 },
    medium: { limit: 10, ttl: 60000 },
    long: { limit: 20, ttl: 3600000 }
  })
  @Post('/login')
  async controlador_ath_lgn(@Body() s_obj: LoginAuthDto, @Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.auth_service.servicio_ath_lgn(s_obj);

      if (o_response.result !== undefined) {
        const o_response_new = {
          message: o_response.message,
          statusCode: o_response.statusCode,
          result: {
            usu_usu_urn: o_response.result.usu_usu_urn,
            usu_usu_ura: o_response.result.usu_usu_ura,
            usu_usu_eml: o_response.result.usu_usu_eml,
            usu_usu_crt: o_response.result.usu_usu_crt,
            usu_usu_upd: o_response.result.usu_usu_upd
          }
        }
        res.status(o_response_new.statusCode);
        // secure: 👈 en desarrollo debe ser false, en prod: true
        // sameSite: 'lax' es suficiente en la mayoría de los casos
        res.cookie('token', o_response.result.token, { httpOnly: false, secure: false, sameSite: 'lax' });
        return o_response_new;
      } else {
        res.status(o_response.statusCode);
        res.cookie('token', '');
        return o_response;
      }
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }

  @Post('/verify-token')
  async controlador_ath_vrf(@Req() req: Request, @Body() s_obj: TokenAuthDto, @Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.auth_service.servicio_ath_vrf(req, s_obj);
      res.status(o_response.statusCode)
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }

  @SkipThrottle({ default: false })
  @Post('/logout')
  async controlador_ath_lgt(@Res({ passthrough: true }) res: Response) {
    try {
      const o_response = {
        message: ["Cerró sesión"],
        statusCode: 200,
        result: {}
      }
      res.status(o_response.statusCode);
      res.cookie('token', "", {
        expires: new Date(0)
      });
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }

  @SkipThrottle({ default: false })
  @Post('/register')
  async controlador_ath_reg(@Body() s_obj: RegisterAuthDto, @Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.auth_service.servicio_ath_reg(s_obj);

      if (o_response.result !== undefined) {
        const o_response_new = {
          message: o_response.message,
          statusCode: o_response.statusCode,
          result: {
            usu_usu_urn: o_response.result.usu_usu_urn,
            usu_usu_ura: o_response.result.usu_usu_ura,
            usu_usu_eml: o_response.result.usu_usu_eml,
            usu_usu_crt: o_response.result.usu_usu_crt,
            usu_usu_upd: o_response.result.usu_usu_upd
          }
        }
        res.status(o_response_new.statusCode);
        res.cookie('token', '');
        return o_response_new;
      } else {
        res.status(o_response.statusCode);
        res.cookie('token', '');
        return o_response;
      }
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }

  @SkipThrottle({ default: false })
  @Post('/list-one-email')
  async controlador_ath_gto(@Body() s_obj: CampoEmailDto, @Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.auth_service.servicio_ath_gto(s_obj);
      res.status(o_response.statusCode);
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }

  @Get('/profile')
  async controlador_ath_pfl(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.auth_service.servicio_ath_pfl(req);
      res.status(o_response.statusCode)
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }

  @Post('/send-email')
  async controlador_ath_eml(@Body() s_obj: EmailAuthDto, @Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.auth_service.servicio_ath_eml(s_obj);
      res.status(o_response.statusCode)
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }

  @Post('/verificar-codigo')
  async controlador_ath_vrc(@Body() s_obj: VerificarCodigoAuthDto, @Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.auth_service.servicio_ath_vrc(s_obj);
      res.status(o_response.statusCode)
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }

  @SkipThrottle({ default: false })
  @Post('/rest-password')
  async controlador_ath_rsp(@Body() s_obj: RestablecerPasswordAuthDto, @Res({ passthrough: true }) res: Response) {
    try {
      const o_response = await this.auth_service.servicio_ath_rsp(s_obj);
      res.status(o_response.statusCode)
      return o_response;
    } catch (error) {
      throw new HttpException(error.response, error.statusCode);
    }
  }
}
