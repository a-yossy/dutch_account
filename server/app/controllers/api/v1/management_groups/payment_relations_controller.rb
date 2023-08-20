# frozen_string_literal: true

class Api::V1::ManagementGroups::PaymentRelationsController < Api::V1::ManagementGroups::ApplicationController
  def bulk_insert
    payment_relation = PaymentRelation::Creator.new(
      management_group: @management_group,
      group_params: payment_relation_params[:group],
      affiliations_params: payment_relation_params[:affiliations]
    ).call!
    render json: PaymentRelationResource.new(payment_relation).serialize, status: :created
  rescue PaymentRelation::GroupMustHaveAtLeastTwoUsersError,
         PaymentRelation::RatioTotalNotEqualsOneError,
         ActiveRecord::RecordInvalid => e
    render_bad_request_error(e)
  end

  private

  def payment_relation_params
    params.permit(group: :name, affiliations: %i[user_id ratio])
  end
end
