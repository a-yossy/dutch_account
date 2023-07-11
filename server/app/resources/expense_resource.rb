# frozen_string_literal: true

class ExpenseResource
  include Alba::Resource

  attribute :amount_of_money do |resource|
    resource.amount_of_money.to_f
  end

  attribute :is_paid do |resource|
    resource.debt_records.first.is_paid
  end

  attributes id: [String, true], description: String, paid_on: [String, true]

  has_one :user, resource: UserResource
  has_one :payment_group, resource: PaymentGroupResource
end
