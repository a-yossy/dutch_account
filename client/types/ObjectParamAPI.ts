import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'

import { AddUserRequest } from '../models/AddUserRequest';
import { ModelError } from '../models/ModelError';
import { User } from '../models/User';

import { ObservableUserApi } from "./ObservableAPI";
import { UserApiRequestFactory, UserApiResponseProcessor} from "../apis/UserApi";

export interface UserApiAddUserRequest {
    /**
     * リクエストユーザ情報
     * @type AddUserRequest
     * @memberof UserApiaddUser
     */
    addUserRequest?: AddUserRequest
}

export interface UserApiGetUserByUserIdRequest {
    /**
     * ユーザID
     * @type number
     * @memberof UserApigetUserByUserId
     */
    userId: number
}

export interface UserApiGetUsersRequest {
}

export interface UserApiUpdateUserByUserIdRequest {
    /**
     * ユーザID
     * @type number
     * @memberof UserApiupdateUserByUserId
     */
    userId: number
    /**
     * リクエストユーザ情報
     * @type AddUserRequest
     * @memberof UserApiupdateUserByUserId
     */
    addUserRequest?: AddUserRequest
}

export class ObjectUserApi {
    private api: ObservableUserApi

    public constructor(configuration: Configuration, requestFactory?: UserApiRequestFactory, responseProcessor?: UserApiResponseProcessor) {
        this.api = new ObservableUserApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * ユーザを作成する
     * ユーザ作成API
     * @param param the request object
     */
    public addUser(param: UserApiAddUserRequest = {}, options?: Configuration): Promise<User> {
        return this.api.addUser(param.addUserRequest,  options).toPromise();
    }

    /**
     * ユーザIDでユーザ情報を取得する
     * ユーザ情報取得API
     * @param param the request object
     */
    public getUserByUserId(param: UserApiGetUserByUserIdRequest, options?: Configuration): Promise<User> {
        return this.api.getUserByUserId(param.userId,  options).toPromise();
    }

    /**
     * 全てのユーザ情報を取得する
     * 全ユーザ情報取得API
     * @param param the request object
     */
    public getUsers(param: UserApiGetUsersRequest = {}, options?: Configuration): Promise<Array<User>> {
        return this.api.getUsers( options).toPromise();
    }

    /**
     * ユーザIDでユーザ情報を更新する
     * ユーザ更新API
     * @param param the request object
     */
    public updateUserByUserId(param: UserApiUpdateUserByUserIdRequest, options?: Configuration): Promise<User> {
        return this.api.updateUserByUserId(param.userId, param.addUserRequest,  options).toPromise();
    }

}
