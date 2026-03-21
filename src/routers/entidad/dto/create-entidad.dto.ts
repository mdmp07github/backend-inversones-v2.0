import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateEntidadDto {

    @MaxLength(10, { message: 'El campo "Código" debe tener máximo 10 carácteres.' })
    @IsString({ message: 'El campo "Código" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Código" no debe estar vacio.' })
    ent_ent_cod: string

    @MaxLength(100, { message: 'El campo "Nombre" debe tener máximo 100 carácteres.' })
    @IsString({ message: 'El campo "Nombre" debe ser de tipo string.' })
    ent_ent_nom?: string

    @MaxLength(1000, { message: 'El campo "Descripción" debe tener máximo 1000 carácteres.' })
    @IsString({ message: 'El campo "Descripción" debe ser de tipo string.' })
    ent_ent_des?: string

    @MaxLength(36, { message: 'El campo "Tipo de Vela" debe tener máximo 36 carácteres.' })
    @IsString({ message: 'El campo "Tipo de Vela" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Tipo de Vela" no debe estar vacio.' })
    ent_ent_tdv: string

    @MaxLength(1, { message: 'El campo "Posición" debe tener máximo 1 carácteres.' })
    @IsString({ message: 'El campo "Posición" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Posición" no debe estar vacio.' })
    ent_ent_pos: string

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
