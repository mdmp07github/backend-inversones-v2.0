import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegisterAuthDto {

    @MaxLength(50, { message: 'El campo "Nombres" debe tener máximo 50 carácteres.' })
    @IsString({ message: 'El campo "Nombres" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Nombres" no debe estar vacio.' })
    usu_usu_urn: string

    @MaxLength(50, { message: 'El campo "Apellidos" debe tener máximo 50 carácteres.' })
    @IsString({ message: 'El campo "Apellidos" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Apellidos" no debe estar vacio.' })
    usu_usu_ura: string

    @MaxLength(50, { message: 'El campo "Email" debe tener máximo 50 carácteres.' })
    @IsString({ message: 'El campo "Email" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Email" no debe estar vacio.' })
    usu_usu_eml: string

    @MaxLength(50, { message: 'El campo "Contraseña" debe tener máximo 50 carácteres.' })
    @IsString({ message: 'El campo "Contraseña" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Contraseña" no debe estar vacio.' })
    usu_usu_pwd: string
}