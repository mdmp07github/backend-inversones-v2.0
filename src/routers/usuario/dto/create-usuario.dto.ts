import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUsuarioDto {

    @MaxLength(50, { message: 'El campo "Nombres" debe tener máximo 50 carácteres.' })
    @IsString({ message: 'El campo "Nombres" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Nombres" no debe estar vacio.' })
    usu_usu_urn?: string

    @MaxLength(50, { message: 'El campo "Apellidos" debe tener máximo 50 carácteres.' })
    @IsString({ message: 'El campo "Apellidos" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Apellidos" no debe estar vacio.' })
    usu_usu_ura?: string

    @MaxLength(50, { message: 'El campo "Email" debe tener máximo 50 carácteres.' })
    @IsString({ message: 'El campo "Email" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Email" no debe estar vacio.' })
    usu_usu_eml?: string

    @MaxLength(50, { message: 'El campo "Contraseña" debe tener máximo 50 carácteres.' })
    @IsString({ message: 'El campo "Contraseña" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Contraseña" no debe estar vacio.' })
    usu_usu_pwd?: string

    @MaxLength(1, { message: 'El campo "Tipo de Documento" debe tener máximo 1 carácter.' })
    @IsString({ message: 'El campo "Tipo de Documento" debe ser de tipo string.' })
    usu_usu_tdd?: string

    @MaxLength(15, { message: 'El campo "Número de Documento" debe tener máximo 15 carácteres.' })
    @IsString({ message: 'El campo "Número de Documento" debe ser de tipo string.' })
    usu_usu_ndd?: string

    @MaxLength(1, { message: 'El campo "Sexo" debe tener máximo 1 carácter.' })
    @IsString({ message: 'El campo "Sexo" debe ser de tipo string.' })
    usu_usu_sex?: string

    @MaxLength(12, { message: 'El campo "Telefono" debe tener máximo 12 carácteres.' })
    @IsString({ message: 'El campo "Telefono" debe ser de tipo string.' })
    usu_usu_tel?: string

    @MaxLength(10, { message: 'El campo "Fecha de nacimiento" debe tener máximo 10 carácteres.' })
    @IsString({ message: 'El campo "Fecha de nacimiento" debe ser de tipo string.' })
    usu_usu_fnc?: string

    @IsString({ message: 'El campo "Estado civil" debe ser de tipo string.' })
    usu_cod_esc?: string

    @IsString({ message: 'El campo "Departamento" debe ser de tipo string.' })
    usu_cod_dpt?: string

    @IsString({ message: 'El campo "Provincia" debe ser de tipo string.' })
    usu_cod_pvc?: string

    @IsString({ message: 'El campo "Distrito" debe ser de tipo string.' })
    usu_cod_dis?: string

    @MaxLength(150, { message: 'El campo "Dirección" debe tener máximo 150 carácteres.' })
    @IsString({ message: 'El campo "Dirección" debe ser de tipo string.' })
    usu_usu_dir?: string

    @MaxLength(1, { message: 'El campo "Autorización" debe tener máximo 1 carácter.' })
    @IsString({ message: 'El campo "Autorización" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Autorización" no debe estar vacio.' })
    usu_usu_aut?: string

    @MaxLength(1, { message: 'El campo "Activación" debe tener máximo 1 carácter.' })
    @IsString({ message: 'El campo "Activación" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Activación" no debe estar vacio.' })
    usu_usu_act?: string

    @MaxLength(1, { message: 'El campo "Confirmación" debe tener máximo 1 carácter.' })
    @IsString({ message: 'El campo "Confirmación" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Confirmación" no debe estar vacio.' })
    usu_usu_cof?: string

    @MaxLength(1, { message: 'El campo "Tipo de usuario" debe tener máximo 1 carácter.' })
    @IsString({ message: 'El campo "Tipo de usuario" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Tipo de usuario" no debe estar vacio.' })
    usu_usu_tdu?: string

    @MaxLength(21, { message: 'El campo "Código" debe tener máximo 21 carácteres.' })
    @IsString({ message: 'El campo "Código" debe ser de tipo string.' })
    usu_usu_cod?: string

    @MaxLength(1, { message: 'El campo "Plan" debe tener máximo 1 carácteres.' })
    @IsString({ message: 'El campo "Plan" debe ser de tipo string.' })
    usu_usu_pln?: string
}