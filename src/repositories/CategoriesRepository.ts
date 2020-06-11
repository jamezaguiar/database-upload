import { EntityRepository, Repository } from 'typeorm';

import capitalize from '../utils/capitalize';

import Category from '../models/Category';

import CreateCategoryService from '../services/CreateCategoryService';

@EntityRepository(Category)
class CategoriesRepository extends Repository<Category> {
  public async verifyIfCategoryExists(title: string): Promise<Category> {
    const capitalizedTitle = capitalize(title);

    let category = await this.findOne({ where: { title: capitalizedTitle } });

    if (!category) {
      const createCategory = new CreateCategoryService();

      category = await createCategory.execute({ title });
    }

    return category;
  }
}

export default CategoriesRepository;
