import { UploadUserFile } from 'element-plus'

export const urlToUploadUserFile = (url: string): UploadUserFile => {
  return { name: url.split('/').pop()!, url }
}
