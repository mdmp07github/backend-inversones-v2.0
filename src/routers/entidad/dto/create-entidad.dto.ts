import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateEntidadDto {

    @MaxLength(10, { message: 'El campo "Código" debe tener máximo 10 carácteres.' })
    @IsString({ message: 'El campo "Código" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Código" no debe estar vacio.' })
    ent_ent_cod: string

    @MaxLength(1000, { message: 'El campo "Descripción" debe tener máximo 1000 carácteres.' })
    @IsString({ message: 'El campo "Descripción" debe ser de tipo string.' })
    ent_ent_des: string

    @MaxLength(10, { message: 'El campo "Fecha de Registro" debe tener máximo 10 carácteres.' })
    @IsString({ message: 'El campo "Fecha de Registro" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Fecha de Registro" no debe estar vacio.' })
    ent_ent_fdr: string

    @MaxLength(5, { message: 'El campo "Hora de Registro" debe tener máximo 5 carácteres.' })
    @IsString({ message: 'El campo "Hora de Registro" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Hora de Registro" no debe estar vacio.' })
    ent_ent_hdr: string

    @MaxLength(4, { message: 'El campo "Año" debe tener máximo 4 carácteres.' })
    @IsString({ message: 'El campo "Año" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Año" no debe estar vacio.' })
    ent_ent_ano: string
}
