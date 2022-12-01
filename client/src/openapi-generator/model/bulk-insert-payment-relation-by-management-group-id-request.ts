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


// May contain unused imports in some cases
// @ts-ignore
import { BulkInsertPaymentRelationByManagementGroupIdRequestAffiliationsInner } from './bulk-insert-payment-relation-by-management-group-id-request-affiliations-inner';
// May contain unused imports in some cases
// @ts-ignore
import { BulkInsertPaymentRelationByManagementGroupIdRequestGroup } from './bulk-insert-payment-relation-by-management-group-id-request-group';

/**
 * 
 * @export
 * @interface BulkInsertPaymentRelationByManagementGroupIdRequest
 */
export interface BulkInsertPaymentRelationByManagementGroupIdRequest {
    /**
     * 
     * @type {BulkInsertPaymentRelationByManagementGroupIdRequestGroup}
     * @memberof BulkInsertPaymentRelationByManagementGroupIdRequest
     */
    'group': BulkInsertPaymentRelationByManagementGroupIdRequestGroup;
    /**
     * 支払グループの所属情報の配列
     * @type {Array<BulkInsertPaymentRelationByManagementGroupIdRequestAffiliationsInner>}
     * @memberof BulkInsertPaymentRelationByManagementGroupIdRequest
     */
    'affiliations': Array<BulkInsertPaymentRelationByManagementGroupIdRequestAffiliationsInner>;
}
