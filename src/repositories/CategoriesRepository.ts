import { EntityRepository, Repository } from 'typeorm';

import Category from '../models/Category';

import CreateCategoryService from '../services/CreateCategoryService';

@EntityRepository(Category)
class CategoriesRepository extends Repository<Category> {
  public async verifyIfCategoryExists(title: string): Promise<Category> {
    let findCategory = await this.findOne({ where: { title } });

    if (!findCategory) {
      const createCategory = new CreateCategoryService();

      findCategory = await createCategory.execute({ title });
    }

    return findCategory;
  }
}

export default CategoriesRepository;
