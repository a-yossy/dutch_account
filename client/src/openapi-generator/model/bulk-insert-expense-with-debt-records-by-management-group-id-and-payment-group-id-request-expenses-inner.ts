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
 * @interface BulkInsertExpenseWithDebtRecordsByManagementGroupIdAndPaymentGroupIdRequestExpensesInner
 */
export interface BulkInsertExpenseWithDebtRecordsByManagementGroupIdAndPaymentGroupIdRequestExpensesInner {
    /**
     * ユーザーID
     * @type {string}
     * @memberof BulkInsertExpenseWithDebtRecordsByManagementGroupIdAndPaymentGroupIdRequestExpensesInner
     */
    'user_id': string;
    /**
     * 金額
     * @type {number}
     * @memberof BulkInsertExpenseWithDebtRecordsByManagementGroupIdAndPaymentGroupIdRequestExpensesInner
     */
    'amount_of_money': number;
    /**
     * 説明
     * @type {string}
     * @memberof BulkInsertExpenseWithDebtRecordsByManagementGroupIdAndPaymentGroupIdRequestExpensesInner
     */
    'description': string;
    /**
     * 支払日
     * @type {string}
     * @memberof BulkInsertExpenseWithDebtRecordsByManagementGroupIdAndPaymentGroupIdRequestExpensesInner
     */
    'paid_on': string;
}
