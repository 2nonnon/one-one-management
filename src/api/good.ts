import { CreateGoodDto, GetGoodsPageDto, IGoodDetail, IGoodsPage, UpdateGoodSkuDto, UpdateGoodSpuDto } from './types/good.type'
import BaseHttpService from '../utils/base-http.service'

class GoodService extends BaseHttpService {
  private BASE_URL = 'goods'

  async getGoods (form: GetGoodsPageDto) {
    const res = await this.post<IGoodsPage>(`${this.BASE_URL}/page`, form)
    return res.data
  }

  async getGoodDetailById (id: number) {
    const res = await this.get<IGoodDetail>(`${this.BASE_URL}/detail/${id}`)
    return res.data
  }

  async createGood (form: CreateGoodDto) {
    const res = await this.post<IGoodDetail>(`${this.BASE_URL}/create`, form)
    return res.data
  }

  async deleteGood (id: number) {
    await this.delete<void>(`${this.BASE_URL}/${id}`)
  }

  async updateGoodSpu (id: number, form: UpdateGoodSpuDto) {
    const res = await this.patch<IGoodDetail>(`${this.BASE_URL}/${id}/spu`, form)
    return res.data
  }

  async updateGoodSku (id: number, form: UpdateGoodSkuDto) {
    const res = await this.patch<IGoodDetail>(`${this.BASE_URL}/${id}/sku`, form)
    return res.data
  }
}

export const goodService = new GoodService()
