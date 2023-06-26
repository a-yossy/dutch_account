# frozen_string_literal: true

FactoryBot.define do
  factory :expense do
    user
    sequence(:amount_of_money) { |i| (i + 1) * 1000 }
    sequence(:description) { |i| "description_#{i}" }
    sequence(:paid_on) { |i| Time.zone.today - i.days }
  end
end
