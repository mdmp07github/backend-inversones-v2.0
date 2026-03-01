import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateDepartamentoDto {

    @MaxLength(50, { message: 'El campo "Descripción" debe tener máximo 50 carácteres.' })
    @IsString({ message: 'El campo "Descripción" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Descripción" no debe estar vacio.' })
    dpt_dpt_des: string
}