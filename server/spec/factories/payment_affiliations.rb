# frozen_string_literal: true

FactoryBot.define do
  factory :payment_affiliation do
    user
    payment_group
    ratio { 0.5 }
  end
end
