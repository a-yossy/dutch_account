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
import { ResponseError } from '../model';
/**
 * DebtRecordApi - axios parameter creator
 * @export
 */
export const DebtRecordApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 管理グループに紐づく全ての借金履歴を返済済みに更新する
         * @summary 管理グループに紐づく全ての借金履歴を返済済みに更新
         * @param {string} managementGroupId 管理グループID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        markDebtRecordsAsPaidByManagementGroupId: async (managementGroupId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'managementGroupId' is not null or undefined
            assertParamExists('markDebtRecordsAsPaidByManagementGroupId', 'managementGroupId', managementGroupId)
            const localVarPath = `/management_groups/{management_group_id}/debt_records/mark_as_paid`
                .replace(`{${"management_group_id"}}`, encodeURIComponent(String(managementGroupId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
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
    }
};

/**
 * DebtRecordApi - functional programming interface
 * @export
 */
export const DebtRecordApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DebtRecordApiAxiosParamCreator(configuration)
    return {
        /**
         * 管理グループに紐づく全ての借金履歴を返済済みに更新する
         * @summary 管理グループに紐づく全ての借金履歴を返済済みに更新
         * @param {string} managementGroupId 管理グループID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async markDebtRecordsAsPaidByManagementGroupId(managementGroupId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.markDebtRecordsAsPaidByManagementGroupId(managementGroupId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * DebtRecordApi - factory interface
 * @export
 */
export const DebtRecordApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DebtRecordApiFp(configuration)
    return {
        /**
         * 管理グループに紐づく全ての借金履歴を返済済みに更新する
         * @summary 管理グループに紐づく全ての借金履歴を返済済みに更新
         * @param {string} managementGroupId 管理グループID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        markDebtRecordsAsPaidByManagementGroupId(managementGroupId: string, options?: any): AxiosPromise<void> {
            return localVarFp.markDebtRecordsAsPaidByManagementGroupId(managementGroupId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DebtRecordApi - object-oriented interface
 * @export
 * @class DebtRecordApi
 * @extends {BaseAPI}
 */
export class DebtRecordApi extends BaseAPI {
    /**
     * 管理グループに紐づく全ての借金履歴を返済済みに更新する
     * @summary 管理グループに紐づく全ての借金履歴を返済済みに更新
     * @param {string} managementGroupId 管理グループID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DebtRecordApi
     */
    public markDebtRecordsAsPaidByManagementGroupId(managementGroupId: string, options?: AxiosRequestConfig) {
        return DebtRecordApiFp(this.configuration).markDebtRecordsAsPaidByManagementGroupId(managementGroupId, options).then((request) => request(this.axios, this.basePath));
    }
}
