import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Categories } from './schemas/categories.schema';
import { CategoriesDto } from './dto/categories.dto';
import { UpdateCategoryDto } from './dto/update-categories';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('new')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() categories: CategoriesDto) {
    return this.categoriesService.create(categories);
  }

  @Get()
  findAll(): Promise<Categories[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Categories> {
    return this.categoriesService.getById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
