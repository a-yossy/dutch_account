# frozen_string_literal: true

class DebtRecord < ApplicationRecord
  belongs_to :lending_user, class_name: 'User'
  belongs_to :borrowing_user, class_name: 'User'
  belongs_to :expense

  validates :amount_of_money, presence: true, numericality: { greater_than: 0 }
  validates :lending_user, uniqueness: { scope: %i[borrowing_user expense] }
end
