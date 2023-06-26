# frozen_string_literal: true

FactoryBot.define do
  factory :debt_record do
    expense
    lending_user { expense.user }
    borrowing_user { create(:user) }
    sequence(:amount_of_money) { |i| (i + 1) * 1000 }
  end
end
