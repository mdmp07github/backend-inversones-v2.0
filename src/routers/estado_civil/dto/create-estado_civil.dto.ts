import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateEstadoCivilDto {

    @MaxLength(15, { message: 'El campo "Descripción" debe tener máximo 15 carácteres.' })
    @IsString({ message: 'El campo "Descripción" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Descripción" no debe estar vacio.' })
    esc_esc_des: string
}