import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categories, CategoriesDocument } from './schemas/categories.schema';
import { Model } from 'mongoose';
import { CategoriesDto } from './dto/categories.dto';
import { UpdateCategoryDto } from './dto/update-categories';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories.name)
    private categoriesModel: Model<CategoriesDocument>,
  ) {}
  async create(categoriesDto: CategoriesDto): Promise<Categories> {
    const newCategory = new this.categoriesModel(categoriesDto);
    return newCategory.save();
  }
  async findAll(): Promise<Categories[]> {
    const categories = await this.categoriesModel.find().exec();
    return categories;
  }

  async getById(id: string): Promise<Categories> {
    return this.categoriesModel.findById(id);
  }

  async update(
    id: string,
    categoriesDto: UpdateCategoryDto,
  ): Promise<Categories> {
    const updatedCategory = await this.categoriesModel
      .findByIdAndUpdate(id, categoriesDto, {
        new: true,
      })
      .exec();
    return updatedCategory;
  }

  async remove(id: string): Promise<Categories> {
    return this.categoriesModel.findByIdAndDelete(id);
  }
}
