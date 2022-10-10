# frozen_string_literal: true

FactoryBot.define do
  factory :management_group do
    sequence(:name) { |i| "name_#{i}" }
  end
end
