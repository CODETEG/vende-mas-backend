export interface IApiMessage {
  content: string[]
  displayable: boolean
}

export interface IApiResponse<T> {
  success: boolean
  data: T | null
  message: IApiMessage
}

export interface IPaginatedResponse<T> {
  records: T[]
  total: number
  limit: number
  page: number
  pages: number
}
