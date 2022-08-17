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
 * 送金履歴
 * @export
 * @interface FromRemittanceRecord
 */
export interface FromRemittanceRecord {
    /**
     * 送金履歴ID
     * @type {number}
     * @memberof FromRemittanceRecord
     */
    'id': number;
    /**
     * 送金ユーザー名
     * @type {string}
     * @memberof FromRemittanceRecord
     */
    'from_user_name': string;
    /**
     * 送金金額
     * @type {number}
     * @memberof FromRemittanceRecord
     */
    'amount_of_money': number;
    /**
     * 送金日
     * @type {string}
     * @memberof FromRemittanceRecord
     */
    'transferred_on': string;
}

