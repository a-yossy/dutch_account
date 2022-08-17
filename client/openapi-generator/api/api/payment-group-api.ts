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
import { AddPaymentGroupRequest } from '../model';
// @ts-ignore
import { PaymentGroup } from '../model';
/**
 * PaymentGroupApi - axios parameter creator
 * @export
 */
export const PaymentGroupApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 支払グループを作成する
         * @summary 支払グループ作成
         * @param {AddPaymentGroupRequest} [addPaymentGroupRequest] リクエスト支払グループ
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addPaymentGroup: async (addPaymentGroupRequest?: AddPaymentGroupRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/payment_groups`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication cookieAuth required


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(addPaymentGroupRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 支払グループIDで支払グループを削除する
         * @summary 支払グループ削除
         * @param {number} paymentGroupId 支払グループID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deletePaymentGroupByPaymentGroupId: async (paymentGroupId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'paymentGroupId' is not null or undefined
            assertParamExists('deletePaymentGroupByPaymentGroupId', 'paymentGroupId', paymentGroupId)
            const localVarPath = `/payment_groups/{payment_group_id}`
                .replace(`{${"payment_group_id"}}`, encodeURIComponent(String(paymentGroupId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication cookieAuth required


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 支払グループIDで支払グループを取得する
         * @summary 支払グループ取得
         * @param {number} paymentGroupId 支払グループID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getPaymentGroupByPaymentGroupId: async (paymentGroupId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'paymentGroupId' is not null or undefined
            assertParamExists('getPaymentGroupByPaymentGroupId', 'paymentGroupId', paymentGroupId)
            const localVarPath = `/payment_groups/{payment_group_id}`
                .replace(`{${"payment_group_id"}}`, encodeURIComponent(String(paymentGroupId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication cookieAuth required


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 全ての支払グループを取得する
         * @summary 全支払グループ取得
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getPaymentGroups: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/payment_groups`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication cookieAuth required


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 支払グループIDで支払グループを更新する
         * @summary 支払グループ更新
         * @param {number} paymentGroupId 支払グループID
         * @param {AddPaymentGroupRequest} [addPaymentGroupRequest] リクエスト支払グループ
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updatePaymentGroupByPaymentGroupId: async (paymentGroupId: number, addPaymentGroupRequest?: AddPaymentGroupRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'paymentGroupId' is not null or undefined
            assertParamExists('updatePaymentGroupByPaymentGroupId', 'paymentGroupId', paymentGroupId)
            const localVarPath = `/payment_groups/{payment_group_id}`
                .replace(`{${"payment_group_id"}}`, encodeURIComponent(String(paymentGroupId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication cookieAuth required


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(addPaymentGroupRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * PaymentGroupApi - functional programming interface
 * @export
 */
export const PaymentGroupApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = PaymentGroupApiAxiosParamCreator(configuration)
    return {
        /**
         * 支払グループを作成する
         * @summary 支払グループ作成
         * @param {AddPaymentGroupRequest} [addPaymentGroupRequest] リクエスト支払グループ
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addPaymentGroup(addPaymentGroupRequest?: AddPaymentGroupRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaymentGroup>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.addPaymentGroup(addPaymentGroupRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 支払グループIDで支払グループを削除する
         * @summary 支払グループ削除
         * @param {number} paymentGroupId 支払グループID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deletePaymentGroupByPaymentGroupId(paymentGroupId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deletePaymentGroupByPaymentGroupId(paymentGroupId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 支払グループIDで支払グループを取得する
         * @summary 支払グループ取得
         * @param {number} paymentGroupId 支払グループID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getPaymentGroupByPaymentGroupId(paymentGroupId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaymentGroup>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getPaymentGroupByPaymentGroupId(paymentGroupId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 全ての支払グループを取得する
         * @summary 全支払グループ取得
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getPaymentGroups(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<PaymentGroup>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getPaymentGroups(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 支払グループIDで支払グループを更新する
         * @summary 支払グループ更新
         * @param {number} paymentGroupId 支払グループID
         * @param {AddPaymentGroupRequest} [addPaymentGroupRequest] リクエスト支払グループ
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updatePaymentGroupByPaymentGroupId(paymentGroupId: number, addPaymentGroupRequest?: AddPaymentGroupRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaymentGroup>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updatePaymentGroupByPaymentGroupId(paymentGroupId, addPaymentGroupRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * PaymentGroupApi - factory interface
 * @export
 */
export const PaymentGroupApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = PaymentGroupApiFp(configuration)
    return {
        /**
         * 支払グループを作成する
         * @summary 支払グループ作成
         * @param {AddPaymentGroupRequest} [addPaymentGroupRequest] リクエスト支払グループ
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addPaymentGroup(addPaymentGroupRequest?: AddPaymentGroupRequest, options?: any): AxiosPromise<PaymentGroup> {
            return localVarFp.addPaymentGroup(addPaymentGroupRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 支払グループIDで支払グループを削除する
         * @summary 支払グループ削除
         * @param {number} paymentGroupId 支払グループID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deletePaymentGroupByPaymentGroupId(paymentGroupId: number, options?: any): AxiosPromise<void> {
            return localVarFp.deletePaymentGroupByPaymentGroupId(paymentGroupId, options).then((request) => request(axios, basePath));
        },
        /**
         * 支払グループIDで支払グループを取得する
         * @summary 支払グループ取得
         * @param {number} paymentGroupId 支払グループID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getPaymentGroupByPaymentGroupId(paymentGroupId: number, options?: any): AxiosPromise<PaymentGroup> {
            return localVarFp.getPaymentGroupByPaymentGroupId(paymentGroupId, options).then((request) => request(axios, basePath));
        },
        /**
         * 全ての支払グループを取得する
         * @summary 全支払グループ取得
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getPaymentGroups(options?: any): AxiosPromise<Array<PaymentGroup>> {
            return localVarFp.getPaymentGroups(options).then((request) => request(axios, basePath));
        },
        /**
         * 支払グループIDで支払グループを更新する
         * @summary 支払グループ更新
         * @param {number} paymentGroupId 支払グループID
         * @param {AddPaymentGroupRequest} [addPaymentGroupRequest] リクエスト支払グループ
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updatePaymentGroupByPaymentGroupId(paymentGroupId: number, addPaymentGroupRequest?: AddPaymentGroupRequest, options?: any): AxiosPromise<PaymentGroup> {
            return localVarFp.updatePaymentGroupByPaymentGroupId(paymentGroupId, addPaymentGroupRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * PaymentGroupApi - object-oriented interface
 * @export
 * @class PaymentGroupApi
 * @extends {BaseAPI}
 */
export class PaymentGroupApi extends BaseAPI {
    /**
     * 支払グループを作成する
     * @summary 支払グループ作成
     * @param {AddPaymentGroupRequest} [addPaymentGroupRequest] リクエスト支払グループ
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentGroupApi
     */
    public addPaymentGroup(addPaymentGroupRequest?: AddPaymentGroupRequest, options?: AxiosRequestConfig) {
        return PaymentGroupApiFp(this.configuration).addPaymentGroup(addPaymentGroupRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 支払グループIDで支払グループを削除する
     * @summary 支払グループ削除
     * @param {number} paymentGroupId 支払グループID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentGroupApi
     */
    public deletePaymentGroupByPaymentGroupId(paymentGroupId: number, options?: AxiosRequestConfig) {
        return PaymentGroupApiFp(this.configuration).deletePaymentGroupByPaymentGroupId(paymentGroupId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 支払グループIDで支払グループを取得する
     * @summary 支払グループ取得
     * @param {number} paymentGroupId 支払グループID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentGroupApi
     */
    public getPaymentGroupByPaymentGroupId(paymentGroupId: number, options?: AxiosRequestConfig) {
        return PaymentGroupApiFp(this.configuration).getPaymentGroupByPaymentGroupId(paymentGroupId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 全ての支払グループを取得する
     * @summary 全支払グループ取得
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentGroupApi
     */
    public getPaymentGroups(options?: AxiosRequestConfig) {
        return PaymentGroupApiFp(this.configuration).getPaymentGroups(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 支払グループIDで支払グループを更新する
     * @summary 支払グループ更新
     * @param {number} paymentGroupId 支払グループID
     * @param {AddPaymentGroupRequest} [addPaymentGroupRequest] リクエスト支払グループ
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentGroupApi
     */
    public updatePaymentGroupByPaymentGroupId(paymentGroupId: number, addPaymentGroupRequest?: AddPaymentGroupRequest, options?: AxiosRequestConfig) {
        return PaymentGroupApiFp(this.configuration).updatePaymentGroupByPaymentGroupId(paymentGroupId, addPaymentGroupRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
