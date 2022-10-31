# frozen_string_literal: true

class Api::V1::ManagementGroups::PaymentGroups::PaymentAffiliationsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_management_group
  before_action :set_payment_group, only: %i[index]
  rescue_from RatioTotalNotEqualsOneError, ActiveRecord::RecordInvalid, with: :render_transaction

  def index
    render json: PaymentAffiliationResource.new(
      @payment_group.payment_affiliations
                    .eager_load(:user)
                    .order('users.name asc')
    ).serialize
  end

  def bulk_insert
    payment_group_affiliations = PaymentGroupAffiliationsCreator.new(
      management_group: @management_group,
      payment_group_params: payment_group_affiliations_params[:payment_group],
      payment_affiliations_params: payment_group_affiliations_params[:payment_affiliations]
    ).call
    render json: PaymentGroupAffiliationsResource.new(payment_group_affiliations).serialize, status: :created
  end

  private

  def set_management_group
    @management_group = current_user.management_groups.find(params[:management_group_id])
  end

  def set_payment_group
    @payment_group = @management_group.payment_groups.find(params[:payment_group_id])
  end

  def payment_group_affiliations_params
    params.permit(payment_group: :name, payment_affiliations: %i[user_id ratio])
  end

  def render_transaction(error)
    render json: {
      messages: error.message.split(',')
    }, status: :bad_request
  end
end