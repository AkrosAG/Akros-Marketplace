export type ValidationMessages<T> = {
  [P in keyof T]?: {
    [key: string]: string
  }
}
