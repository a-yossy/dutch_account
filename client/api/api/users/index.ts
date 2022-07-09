/* eslint-disable */
import type * as Types from '../@types'

export type Methods = {
  /** 全てのユーザ情報を取得する */
  get: {
    status: 200
    /** 全てのユーザー情報 */
    resBody: Types.User[]
  }

  /** ユーザを作成する */
  post: {
    status: 201
    /** 追加されたユーザ情報 */
    resBody: Types.User
    /** リクエストユーザ情報 */
    reqBody: Types.UserBody
  }
}
