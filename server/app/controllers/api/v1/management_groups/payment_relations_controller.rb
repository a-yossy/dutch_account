# frozen_string_literal: true

class Api::V1::ManagementGroups::PaymentRelationsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_management_group

  def bulk_insert
    payment_relation = PaymentRelationCreator.new(
      management_group: @management_group,
      group_params: payment_relation_params[:group],
      affiliations_params: payment_relation_params[:affiliations]
    ).call!
    render json: PaymentRelationResource.new(payment_relation).serialize, status: :created
  rescue PaymentRelation::GroupMustHaveAtLeastTwoUsersError,
         PaymentRelation::NotBelongingToManagementGroupError,
         PaymentRelation::RatioTotalNotEqualsOneError,
         ActiveRecord::RecordInvalid => e
    render_bad_request_error(e)
  end

  private

  def set_management_group
    @management_group = current_user.management_groups.find(params[:management_group_id])
  end

  def payment_relation_params
    params.permit(group: :name, affiliations: %i[user_id ratio])
  end
end
