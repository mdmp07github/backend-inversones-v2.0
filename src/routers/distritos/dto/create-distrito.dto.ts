import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateDistritoDto {

    @MaxLength(50, { message: 'El campo "Descripción" debe tener máximo 50 carácteres.' })
    @IsString({ message: 'El campo "Descripción" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Descripción" no debe estar vacio.' })
    dis_dis_des: string

    @IsString({ message: 'El campo "ID Depattamento" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "ID Depattamento" no debe estar vacio.' })
    dis_pvc_cod: string
}