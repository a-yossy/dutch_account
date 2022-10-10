# frozen_string_literal: true

FactoryBot.define do
  factory :management_affiliation do
    user
    management_group
  end
end
