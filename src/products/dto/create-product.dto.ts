import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

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

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    tagIds?: number[];
}
