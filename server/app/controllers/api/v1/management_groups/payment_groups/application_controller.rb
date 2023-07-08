# frozen_string_literal: true

class Api::V1::ManagementGroups::PaymentGroups::ApplicationController < Api::V1::ManagementGroups::ApplicationController
  before_action :set_payment_group

  private

  def set_payment_group
    @payment_group = @management_group.payment_groups.find(params[:payment_group_id])
  end
end
