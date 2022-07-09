import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'

import { AddUserRequest } from '../models/AddUserRequest';
import { ModelError } from '../models/ModelError';
import { User } from '../models/User';
import { ObservableUserApi } from './ObservableAPI';

import { UserApiRequestFactory, UserApiResponseProcessor} from "../apis/UserApi";
export class PromiseUserApi {
    private api: ObservableUserApi

    public constructor(
        configuration: Configuration,
        requestFactory?: UserApiRequestFactory,
        responseProcessor?: UserApiResponseProcessor
    ) {
        this.api = new ObservableUserApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * ユーザを作成する
     * ユーザ作成API
     * @param addUserRequest リクエストユーザ情報
     */
    public addUser(addUserRequest?: AddUserRequest, _options?: Configuration): Promise<User> {
        const result = this.api.addUser(addUserRequest, _options);
        return result.toPromise();
    }

    /**
     * ユーザIDでユーザ情報を取得する
     * ユーザ情報取得API
     * @param userId ユーザID
     */
    public getUserByUserId(userId: number, _options?: Configuration): Promise<User> {
        const result = this.api.getUserByUserId(userId, _options);
        return result.toPromise();
    }

    /**
     * 全てのユーザ情報を取得する
     * 全ユーザ情報取得API
     */
    public getUsers(_options?: Configuration): Promise<Array<User>> {
        const result = this.api.getUsers(_options);
        return result.toPromise();
    }

    /**
     * ユーザIDでユーザ情報を更新する
     * ユーザ更新API
     * @param userId ユーザID
     * @param addUserRequest リクエストユーザ情報
     */
    public updateUserByUserId(userId: number, addUserRequest?: AddUserRequest, _options?: Configuration): Promise<User> {
        const result = this.api.updateUserByUserId(userId, addUserRequest, _options);
        return result.toPromise();
    }


}



