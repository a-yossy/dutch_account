# frozen_string_literal: true

FactoryBot.define do
  factory :admin do
    name { 'admin' }
    email { 'admin@example.com' }
    password { 'password' }
  end
end
