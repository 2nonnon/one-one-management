import { IAttributes, CreateAttributeDto, IAttribute } from './types/attribute.type'
import BaseHttpService from '../utils/base-http.service'

class AttributeService extends BaseHttpService {
  private BASE_URL = 'attributes'

  async getAttributes () {
    const res = await this.get<IAttributes[]>(this.BASE_URL)
    return res.data
  }

  async createAttribute (data: CreateAttributeDto) {
    const res = await this.post<IAttribute>(this.BASE_URL, data)
    return res.data
  }

  async deleteAttribute (id: number) {
    await this.delete<void>(`${this.BASE_URL}/${id}`)
  }

  async updateAttribute (data: CreateAttributeDto) {
    const res = await this.post<IAttribute>(this.BASE_URL, data)
    return res.data
  }
}

export const attributeService = new AttributeService()
