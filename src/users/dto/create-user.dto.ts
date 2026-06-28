import { IsString, IsEmail, IsNumber } from 'class-validator';

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail({}, { message: 'รูปแบบอีเมลไม่ถูกต้องครับท่าน' })
    email: string;

    @IsNumber()
    age: number;
}
