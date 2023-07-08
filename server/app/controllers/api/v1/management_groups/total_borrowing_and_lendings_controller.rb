# frozen_string_literal: true

class Api::V1::ManagementGroups::TotalBorrowingAndLendingsController < Api::V1::ManagementGroups::ApplicationController
  def index
    total_borrowing_and_lendings = TotalBorrowingAndLendingGetter.new(@management_group).call
    render json: TotalBorrowingAndLendingResource.new(total_borrowing_and_lendings).serialize
  end
end
