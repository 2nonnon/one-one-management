import { ICategories, CreateCategoryDto, ICategory } from './types/category'
import BaseHttpService from '../utils/base-http.service'

class CategoryService extends BaseHttpService {
  async getCategories () {
    const res = await this.get<ICategories[]>('categories')
    return res.data
  }

  async createCategory (data: CreateCategoryDto) {
    const res = await this.post<ICategory>('categories', data)
    return res.data
  }

  async deleteCategory (id: number) {
    await this.delete<void>(`categories/${id}`)
  }

  async updateCategory (data: CreateCategoryDto) {
    const res = await this.post<ICategory>('categories', data)
    return res.data
  }
}

export const categoryService = new CategoryService()
