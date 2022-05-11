import BaseHttpService from '../utils/base-http.service'
import { INotice, CreateNoticeDto } from './types/notice.type'

class NoticeService extends BaseHttpService {
  private BASE_URL = 'notices'

  async getNotices () {
    const res = await this.get<INotice[]>(this.BASE_URL)
    return res.data
  }

  async createNotice (data: CreateNoticeDto) {
    const res = await this.post<INotice>(this.BASE_URL, data)
    return res.data
  }

  async deleteNotice (id: number) {
    await this.delete<void>(`${this.BASE_URL}/${id}`)
  }
}

export const noticeService = new NoticeService()
