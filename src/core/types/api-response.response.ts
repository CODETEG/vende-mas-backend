export interface ApiResponse<T> {
  success: boolean
  data: T | null
  message: {
    content: string[]
    displayable: boolean
  }
}
