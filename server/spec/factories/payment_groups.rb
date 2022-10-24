# frozen_string_literal: true

FactoryBot.define do
  factory :payment_group do
    management_group
    sequence(:name) { |i| "name_#{i}" }
  end
end
