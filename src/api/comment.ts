import BaseHttpService from '../utils/base-http.service'
import { IComment } from './types/comment.type'

class CommentService extends BaseHttpService {
  private BASE_URL = 'comments'

  async getComments () {
    const res = await this.get<IComment[]>(this.BASE_URL)
    return res.data
  }

  async deleteComment (id: number) {
    await this.delete<void>(`${this.BASE_URL}/${id}`)
  }
}

export const commentService = new CommentService()
