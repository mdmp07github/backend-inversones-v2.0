import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateTipoVelaDto {

    @MaxLength(10, { message: 'El campo "Código" debe tener máximo 10 carácteres.' })
    @IsString({ message: 'El campo "Código" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Código" no debe estar vacio.' })
    tdv_tdv_cod: string

    @MaxLength(50, { message: 'El campo "Descripción" debe tener máximo 50 carácteres.' })
    @IsString({ message: 'El campo "Descripción" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Descripción" no debe estar vacio.' })
    tdv_tdv_des: string

    @MaxLength(10, { message: 'El campo "Símbolo" debe tener máximo 10 carácteres.' })
    @IsString({ message: 'El campo "Símbolo" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Símbolo" no debe estar vacio.' })
    tdv_tdv_sbl: string

    @MaxLength(20, { message: 'El campo "Color" debe tener máximo 20 carácteres.' })
    @IsString({ message: 'El campo "Color" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Color" no debe estar vacio.' })
    tdv_tdv_col: string

    @MaxLength(7, { message: 'El campo "Color de fondo" debe tener máximo 7 carácteres.' })
    @IsString({ message: 'El campo "Color de fondo" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Color de fondo" no debe estar vacio.' })
    tdv_tdv_cdf: string

    @MaxLength(7, { message: 'El campo "Color de texto" debe tener máximo 7 carácteres.' })
    @IsString({ message: 'El campo "Color de texto" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Color de texto" no debe estar vacio.' })
    tdv_tdv_cdt: string

    @MaxLength(2, { message: 'El campo "Prioridad" debe tener máximo 2 carácteres.' })
    @IsString({ message: 'El campo "Prioridad" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Prioridad" no debe estar vacio.' })
    tdv_tdv_prd: string
}
