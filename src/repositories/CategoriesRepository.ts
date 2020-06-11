import { EntityRepository, Repository } from 'typeorm';

import Category from '../models/Category';

import CreateCategoryService from '../services/CreateCategoryService';

@EntityRepository(Category)
class CategoriesRepository extends Repository<Category> {
  public async verifyIfCategoryExists(title: string): Promise<Category> {
    let category = await this.findOne({ where: { title } });

    if (!category) {
      const createCategory = new CreateCategoryService();

      category = await createCategory.execute({ title });
    }

    return category;
  }
}

export default CategoriesRepository;
