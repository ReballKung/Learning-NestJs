import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async create(createProductDto: CreateProductDto) {
    const { tagIds, categoryId, ...productData } = createProductDto;

    return this.prisma.product.create({
      data: {
        ...productData,

        category: categoryId ? {
          connect: { id: categoryId }
        } : undefined,

        tags: tagIds && tagIds.length > 0 ? {
          connect: tagIds.map((id) => ({ id }))
        } : undefined
      }
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      include: { category: true, tags: true },
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`ไม่พบสินค้าที่ ID เป็น ${id}`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
