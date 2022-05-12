import BaseHttpService from '../utils/base-http.service'

class UserService extends BaseHttpService {
  private BASE_URL = 'users'

  async getAllUser () {
    const res = await this.get<any[]>(`${this.BASE_URL}/all`)
    return res.data
  }
}

export const userService = new UserService()
