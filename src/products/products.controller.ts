import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  create(@Req() req: any, @Body() createProductDto: CreateProductDto) {
    console.log('ข้อมูล User ที่แกะได้จาก Token:', req.user);
    // 2. ท่าดักทุกทาง: ถ้าไม่มี userId ก็ให้ไปเอา id, ถ้าไม่มี id ก็ให้ไปเอา sub
    const userId = req.user?.userId || req.user?.id || req.user?.sub;

    // 3. ปรินต์เช็กความชัวร์ก่อนส่งให้ Service
    console.log('สรุปได้ ID ตัวเลขคือ:', userId);

    return this.productsService.create(createProductDto, userId);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
