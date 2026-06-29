import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EmployeesModule } from './employees/employees.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [UsersModule, EmployeesModule, PrismaModule, ProductsModule, CategoriesModule, TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
