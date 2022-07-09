/* eslint-disable */
export type UserId = {
  /** ユーザID */
  user_id: number
}

/** エラー情報 */
export type Error = {
  /** HTTPステータスコード */
  code: string
  /** エラーメッセージ */
  message: string
}

/** ユーザ情報 */
export type User = {
  /** ユーザID */
  id: number
  /** ユーザ名 */
  name: string
}
