import { GetGoodsPageDto, IGoodDetail, IGoodsPage } from './types/good'
import BaseHttpService from '../utils/base-http.service'

class GoodService extends BaseHttpService {
  async getGoods (form: GetGoodsPageDto) {
    const res = await this.post<IGoodsPage>('goods', form)
    return res.data
  }

  async getGoodDetailById (id: number) {
    const res = await this.get<IGoodDetail>(`goods/detail/${id}`)
    return res.data
  }
}

export const goodService = new GoodService()
