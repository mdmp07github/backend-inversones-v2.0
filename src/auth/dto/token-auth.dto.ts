import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class TokenAuthDto {

    @IsString({ message: 'El campo "Token" debe ser de tipo string.' })
    @IsNotEmpty({ message: 'El campo "Token" no debe estar vacio.' })
    usu_usu_tkn: string
}