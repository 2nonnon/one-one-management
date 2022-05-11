import BaseHttpService from '../utils/base-http.service'
import { GetOrdersPageDto, IOrder, IOrdersPage, UpdateOrderReceiveInfoDto, UpdateOrderStatusDto } from './types/order.type'

class OrderService extends BaseHttpService {
    private BASE_URL = 'orders/admin'

    async getOrderById (id: number) {
      const res = await this.get<IOrder>(`${this.BASE_URL}/${id}`)
      return res.data
    }

    async getOrdersPage (data: GetOrdersPageDto) {
      const res = await this.post<IOrdersPage>(`${this.BASE_URL}/page`, data)
      return res.data
    }

    async updateOrderStatus (id: number, data: UpdateOrderStatusDto) {
      const res = await this.patch<IOrder>(`${this.BASE_URL}/${id}/status`, data)
      return res.data
    }

    async updateOrderReceiveInfo (id: number, data: UpdateOrderReceiveInfoDto) {
      const res = await this.patch<IOrder>(`${this.BASE_URL}/${id}/receive`, data)
      return res.data
    }
}

export const orderService = new OrderService()
