import { IsString, IsEmail, IsNumber, MinLength } from 'class-validator';

export class CreateEmployeeDto {
    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    position: string;

    @IsNumber()
    salary: number;

    @IsEmail()
    email: string;
}
