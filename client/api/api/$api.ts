import type { AspidaClient, BasicHeaders } from 'aspida'
import type { Methods as Methods0 } from './users'
import type { Methods as Methods1 } from './users/_user_id@number'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:3000/api' : baseURL).replace(/\/$/, '')
  const PATH0 = '/users'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'

  return {
    users: {
      _user_id: (val1: number) => {
        const prefix1 = `${PATH0}/${val1}`

        return {
          /**
           * ユーザIDでユーザ情報を取得する
           * @returns ユーザ情報
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix1, GET, option).json(),
          /**
           * ユーザIDでユーザ情報を取得する
           * @returns ユーザ情報
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          /**
           * ユーザIDでユーザ情報を更新する
           * @param option.body - リクエストユーザ情報
           * @returns ユーザ情報
           */
          put: (option: { body: Methods1['put']['reqBody'], config?: T | undefined }) =>
            fetch<Methods1['put']['resBody'], BasicHeaders, Methods1['put']['status']>(prefix, prefix1, PUT, option).json(),
          /**
           * ユーザIDでユーザ情報を更新する
           * @param option.body - リクエストユーザ情報
           * @returns ユーザ情報
           */
          $put: (option: { body: Methods1['put']['reqBody'], config?: T | undefined }) =>
            fetch<Methods1['put']['resBody'], BasicHeaders, Methods1['put']['status']>(prefix, prefix1, PUT, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      },
      /**
       * 全てのユーザ情報を取得する
       * @returns 全てのユーザー情報
       */
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json(),
      /**
       * 全てのユーザ情報を取得する
       * @returns 全てのユーザー情報
       */
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
      /**
       * ユーザを作成する
       * @param option.body - リクエストユーザ情報
       * @returns 追加されたユーザ情報
       */
      post: (option: { body: Methods0['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option).json(),
      /**
       * ユーザを作成する
       * @param option.body - リクエストユーザ情報
       * @returns 追加されたユーザ情報
       */
      $post: (option: { body: Methods0['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH0}`
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
