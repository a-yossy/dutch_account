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



/**
 * 
 * @export
 * @interface SignUpRequest
 */
export interface SignUpRequest {
    /**
     * 管理者名
     * @type {string}
     * @memberof SignUpRequest
     */
    'name': string;
    /**
     * メールアドレス
     * @type {string}
     * @memberof SignUpRequest
     */
    'email': string;
    /**
     * パスワード
     * @type {string}
     * @memberof SignUpRequest
     */
    'password': string;
}
