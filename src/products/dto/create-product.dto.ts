import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsOptional()
    description: string;

    @IsOptional()
    @IsNumber()
    categoryId?: number;
}
