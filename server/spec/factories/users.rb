# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    name { 'taro' }
    email { 'email@example.com' }
    password { 'password' }
  end
end
