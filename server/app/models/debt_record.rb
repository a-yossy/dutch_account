# frozen_string_literal: true

class DebtRecord < ApplicationRecord
  belongs_to :lending_user, class_name: 'User'
  belongs_to :borrowing_user, class_name: 'User'
  belongs_to :expense
end
