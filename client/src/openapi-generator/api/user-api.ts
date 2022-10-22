/* tslint:disable */
/* eslint-disable */
/**
 * dutch_account_app
 * 割り勘アプリ
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { LogInRequest } from '../model';
// @ts-ignore
import { ResponseError } from '../model';
// @ts-ignore
import { SignUpRequest } from '../model';
// @ts-ignore
import { User } from '../model';
/**
 * UserApi - axios parameter creator
 * @export
 */
export const UserApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * ログインしているユーザーを取得する
         * @summary ログインしているユーザーを取得
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCurrentUser: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/current_user`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication accessToken required
            await setApiKeyToObject(localVarHeaderParameter, "access-token", configuration)

            // authentication client required
            await setApiKeyToObject(localVarHeaderParameter, "client", configuration)

            // authentication uid required
            await setApiKeyToObject(localVarHeaderParameter, "uid", configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * ログインする
         * @summary ログイン
         * @param {LogInRequest} [logInRequest] ログイン用のユーザー
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        logIn: async (logInRequest?: LogInRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/log_in`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(logInRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * ログアウトする
         * @summary ログアウト
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        logOut: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/log_out`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication accessToken required
            await setApiKeyToObject(localVarHeaderParameter, "access-token", configuration)

            // authentication client required
            await setApiKeyToObject(localVarHeaderParameter, "client", configuration)

            // authentication uid required
            await setApiKeyToObject(localVarHeaderParameter, "uid", configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * サインアップする
         * @summary サインアップ
         * @param {SignUpRequest} [signUpRequest] サインアップ用のユーザー
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        signUp: async (signUpRequest?: SignUpRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sign_up`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(signUpRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * UserApi - functional programming interface
 * @export
 */
export const UserApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = UserApiAxiosParamCreator(configuration)
    return {
        /**
         * ログインしているユーザーを取得する
         * @summary ログインしているユーザーを取得
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getCurrentUser(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<User>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getCurrentUser(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * ログインする
         * @summary ログイン
         * @param {LogInRequest} [logInRequest] ログイン用のユーザー
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async logIn(logInRequest?: LogInRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<User>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.logIn(logInRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * ログアウトする
         * @summary ログアウト
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async logOut(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.logOut(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * サインアップする
         * @summary サインアップ
         * @param {SignUpRequest} [signUpRequest] サインアップ用のユーザー
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async signUp(signUpRequest?: SignUpRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<User>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.signUp(signUpRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * UserApi - factory interface
 * @export
 */
export const UserApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = UserApiFp(configuration)
    return {
        /**
         * ログインしているユーザーを取得する
         * @summary ログインしているユーザーを取得
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCurrentUser(options?: any): AxiosPromise<User> {
            return localVarFp.getCurrentUser(options).then((request) => request(axios, basePath));
        },
        /**
         * ログインする
         * @summary ログイン
         * @param {LogInRequest} [logInRequest] ログイン用のユーザー
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        logIn(logInRequest?: LogInRequest, options?: any): AxiosPromise<User> {
            return localVarFp.logIn(logInRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * ログアウトする
         * @summary ログアウト
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        logOut(options?: any): AxiosPromise<void> {
            return localVarFp.logOut(options).then((request) => request(axios, basePath));
        },
        /**
         * サインアップする
         * @summary サインアップ
         * @param {SignUpRequest} [signUpRequest] サインアップ用のユーザー
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        signUp(signUpRequest?: SignUpRequest, options?: any): AxiosPromise<User> {
            return localVarFp.signUp(signUpRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * UserApi - object-oriented interface
 * @export
 * @class UserApi
 * @extends {BaseAPI}
 */
export class UserApi extends BaseAPI {
    /**
     * ログインしているユーザーを取得する
     * @summary ログインしているユーザーを取得
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public getCurrentUser(options?: AxiosRequestConfig) {
        return UserApiFp(this.configuration).getCurrentUser(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * ログインする
     * @summary ログイン
     * @param {LogInRequest} [logInRequest] ログイン用のユーザー
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public logIn(logInRequest?: LogInRequest, options?: AxiosRequestConfig) {
        return UserApiFp(this.configuration).logIn(logInRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * ログアウトする
     * @summary ログアウト
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public logOut(options?: AxiosRequestConfig) {
        return UserApiFp(this.configuration).logOut(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * サインアップする
     * @summary サインアップ
     * @param {SignUpRequest} [signUpRequest] サインアップ用のユーザー
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public signUp(signUpRequest?: SignUpRequest, options?: AxiosRequestConfig) {
        return UserApiFp(this.configuration).signUp(signUpRequest, options).then((request) => request(this.axios, this.basePath));
    }
}