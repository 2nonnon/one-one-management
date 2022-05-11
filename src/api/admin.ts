import BaseHttpService from '../utils/base-http.service'
import { IAdmin, CreateAdminDto, UpdateAdminDto } from './types/admin.type'

class AdminService extends BaseHttpService {
  private BASE_URL = 'admins'

  async getAdmins () {
    const res = await this.get<IAdmin[]>(this.BASE_URL)
    return res.data
  }

  async createAdmin (data: CreateAdminDto) {
    const res = await this.post<IAdmin>(this.BASE_URL, data)
    return res.data
  }

  async deleteAdmin (id: number) {
    await this.delete<void>(`${this.BASE_URL}/${id}`)
  }

  async updateAdmin (data: UpdateAdminDto) {
    const res = await this.patch<IAdmin>(this.BASE_URL, data)
    return res.data
  }
}

export const adminService = new AdminService()
