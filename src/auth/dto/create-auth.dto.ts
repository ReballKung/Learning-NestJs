import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    name: string;

    @IsString()
    role: string;
}

export class loginAuthDTO {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}
