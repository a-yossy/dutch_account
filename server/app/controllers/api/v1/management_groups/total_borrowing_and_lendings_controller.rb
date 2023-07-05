# frozen_string_literal: true

class Api::V1::ManagementGroups::TotalBorrowingAndLendingsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_management_group

  def index
    total_borrowing_and_lendings = TotalBorrowingAndLendingGetter.new(@management_group).call
    render json: TotalBorrowingAndLendingResource.new(total_borrowing_and_lendings).serialize
  end

  private

  def set_management_group
    @management_group = current_user.management_groups.find(params[:management_group_id])
  end
end
