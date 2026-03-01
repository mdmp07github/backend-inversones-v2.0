import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class EmailAuthDto {

    @IsString({ message: 'El campo "ID" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "ID" no debe estar vacio.' })
    id: string

    @MaxLength(50, { message: 'El campo "Receptor" debe tener máximo 50 carácteres.' })
    @IsString({ message: 'El campo "Receptor" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Receptor" no debe estar vacio.' })
    usu_usu_rct: string

    @MaxLength(150, { message: 'El campo "Asunto" debe tener máximo 150 carácteres.' })
    @IsString({ message: 'El campo "Asunto" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Asunto" no debe estar vacio.' })
    usu_usu_ast: string

    @MaxLength(100, { message: 'El campo "Texto" debe tener máximo 150 carácteres.' })
    @IsString({ message: 'El campo "Texto" debe ser de tipo string.' })
    usu_usu_txt: string

    @IsString({ message: 'El campo "Mensaje" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Mensaje" no debe estar vacio.' })
    usu_usu_msn: string

    @MaxLength(21, { message: 'El campo "Código" debe tener máximo 21 carácteres.' })
    @IsString({ message: 'El campo "Código" debe ser de tipo string.' })
    usu_usu_cod: string
}