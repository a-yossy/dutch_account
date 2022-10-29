# frozen_string_literal: true

class Api::V1::ManagementGroups::PaymentGroups::PaymentAffiliationsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_management_group
  before_action :set_payment_group

  def index
    render json: PaymentAffiliationResource.new(@payment_group.payment_affiliations.eager_load(:user)).serialize
  end

  private

  def set_management_group
    @management_group = current_user.management_groups.find(params[:management_group_id])
  end

  def set_payment_group
    @payment_group = @management_group.payment_groups.find(params[:payment_group_id])
  end
end
