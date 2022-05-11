export interface CreateNoticeDto {
    url: string;
    position: string;
  }
export interface INotice extends CreateNoticeDto {
    id: number;
}
