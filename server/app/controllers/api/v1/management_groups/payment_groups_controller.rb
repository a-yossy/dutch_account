# frozen_string_literal: true

class Api::V1::ManagementGroups::PaymentGroupsController < Api::V1::ManagementGroups::ApplicationController
  before_action :set_payment_group, only: %i[show destroy]

  def index
    render json: PaymentGroupResource.new(@management_group.payment_groups.alphabetical_order).serialize
  end

  def show
    render json: PaymentGroupResource.new(@payment_group).serialize
  end

  def destroy
    @payment_group.destroy!
    render status: :no_content
  rescue ActiveRecord::RecordNotDestroyed
    render json: {
      messages: @payment_group.errors.full_messages
    }, status: :bad_request
  end

  private

  def set_payment_group
    @payment_group = @management_group.payment_groups.find(params[:id])
  end
end
