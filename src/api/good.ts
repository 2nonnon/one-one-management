import { CreateGoodDto, GetGoodsPageDto, IGoodDetail, IGoodsPage } from './types/good'
import BaseHttpService from '../utils/base-http.service'

class GoodService extends BaseHttpService {
  private BASE_URL = 'goods'

  async getGoods (form: GetGoodsPageDto) {
    const res = await this.post<IGoodsPage>(`${this.BASE_URL}/page`, form)
    return res.data
  }

  async getGoodDetailById (id: string) {
    const res = await this.get<IGoodDetail>(`${this.BASE_URL}/detail/${id}`)
    return res.data
  }

  async createGood (form: CreateGoodDto) {
    const res = await this.post<IGoodDetail>(`${this.BASE_URL}/create`, form)
    return res.data
  }
}

export const goodService = new GoodService()
