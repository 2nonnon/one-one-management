import { ICategories, CreateCategoryDto, ICategory } from './types/category.type'
import BaseHttpService from '../utils/base-http.service'

class CategoryService extends BaseHttpService {
  private BASE_URL = 'categories'

  async getCategories () {
    const res = await this.get<ICategories[]>(this.BASE_URL)
    return res.data
  }

  async createCategory (data: CreateCategoryDto) {
    const res = await this.post<ICategory>(this.BASE_URL, data)
    return res.data
  }

  async deleteCategory (id: number) {
    await this.delete<void>(`${this.BASE_URL}/${id}`)
  }

  async updateCategory (data: CreateCategoryDto) {
    const res = await this.patch<ICategory>(this.BASE_URL, data)
    return res.data
  }
}

export const categoryService = new CategoryService()
