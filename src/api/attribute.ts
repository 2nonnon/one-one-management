import { IAttributes, CreateAttributeDto, IAttribute } from './types/Attribute'
import BaseHttpService from '../utils/base-http.service'

class AttributeService extends BaseHttpService {
  async getAttributes () {
    const res = await this.get<IAttributes[]>('attributes')
    return res.data
  }

  async createAttribute (data: CreateAttributeDto) {
    const res = await this.post<IAttribute>('attributes', data)
    return res.data
  }

  async deleteAttribute (id: number) {
    await this.delete<void>(`attributes/${id}`)
  }

  async updateAttribute (data: CreateAttributeDto) {
    const res = await this.post<IAttribute>('attributes', data)
    return res.data
  }
}

export const attributeService = new AttributeService()
