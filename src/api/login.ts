import { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import request from '../utils/request'
import { ILoginForm, ISigninResponse } from './types/login'

export const signin = async (data: ILoginForm) => {
  let res: AxiosResponse<ISigninResponse, any>
  try {
    res = await request.post<ISigninResponse>(
      '/auth/signin',
      data
    )
    ElMessage.success('登录成功')
    return res.data
  } catch (error) {
    ElMessage.error('账号或密码错误')
  }
}
