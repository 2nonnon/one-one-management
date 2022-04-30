import { ElMessage } from 'element-plus'
import BaseHttpService from '../utils/base-http.service'
import { ILoginForm, ISigninResponse } from './types/login.type'

class LoginService extends BaseHttpService {
  async signin (data: ILoginForm): Promise<ISigninResponse | void> {
    try {
      const res = await this.post<ISigninResponse>('auth/signin', data)
      this.signinSuccess()
      return res.data
    } catch (error) {
      this.signinFailed()
    }
  }

  signinSuccess () {
    ElMessage.success('登录成功')
  }

  signinFailed () {
    ElMessage.error('账号或密码错误')
  }
}

export const loginService = new LoginService()
