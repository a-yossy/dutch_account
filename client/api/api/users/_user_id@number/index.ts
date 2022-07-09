/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  /** ユーザIDでユーザ情報を取得する */
  get: {
    status: 201
    /** ユーザ情報 */
    resBody: Types.User
  }

  /** ユーザIDでユーザ情報を更新する */
  put: {
    status: 200
    /** ユーザ情報 */
    resBody: Types.User
    /** リクエストユーザ情報 */
    reqBody: Types.UserBody
  }
}
