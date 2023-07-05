# frozen_string_literal: true

class TotalBorrowingAndLendingResource
  include Alba::Resource

  attribute :amount_of_money do |resource|
    resource[:amount_of_money].to_f
  end

  attribute :user_id do |resource|
    resource[:user_id].to_s
  end
end
