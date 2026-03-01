import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class VerificarCodigoAuthDto {

    @MaxLength(50, { message: 'El campo "Email" debe tener máximo 50 carácteres.' })
    @IsString({ message: 'El campo "Email" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Email" no debe estar vacio.' })
    usu_usu_eml: string

    @MaxLength(21, { message: 'El campo "Código" debe tener máximo 21 carácteres.' })
    @IsString({ message: 'El campo "Código" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Código" no debe estar vacio.' })
    usu_usu_cod: string
}