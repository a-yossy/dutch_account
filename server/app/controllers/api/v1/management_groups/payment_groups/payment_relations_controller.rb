# frozen_string_literal: true

class Api::V1::ManagementGroups::PaymentGroups::PaymentRelationsController < Api::V1::ManagementGroups::PaymentGroups::ApplicationController
  def bulk_update
    payment_relation = PaymentRelation::Updator.new(
      group_params: payment_relation_params[:group],
      affiliations_params: payment_relation_params[:affiliations],
      payment_group: @payment_group
    ).call!
    render json: PaymentRelationResource.new(payment_relation).serialize
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
