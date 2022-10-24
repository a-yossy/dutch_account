# frozen_string_literal: true

class Api::V1::ManagementGroups::PaymentGroupsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_management_group
  before_action :set_payment_group, only: %i[show]

  def index
    render json: PaymentGroupResource.new(@management_group.payment_groups.alphabetical_order).serialize
  end

  def show
    render json: PaymentGroupResource.new(@payment_group).serialize
  end

  private

  def set_management_group
    @management_group = current_user.management_groups.find(params[:management_group_id])
  end

  def set_payment_group
    @payment_group = @management_group.payment_groups.find(params[:id])
  end
end
