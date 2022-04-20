import request from '../utils/request'
import { ILoginForm, ISigninResponse } from './types/login'

export const signin = async (data: ILoginForm) => {
  const res = await request.post<ISigninResponse>(
    '/auth/signin',
    data
  )
  return res.data
}
