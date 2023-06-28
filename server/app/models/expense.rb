# frozen_string_literal: true

class Expense < ApplicationRecord
  belongs_to :user
  belongs_to :payment_group

  has_many :debt_records, dependent: :destroy

  scope :recently_paid, -> { order(paid_on: :desc, id: :desc) }

  validates :amount_of_money, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :description, presence: true, length: { maximum: 255 }
  validates :paid_on, presence: true, comparison: { less_than_or_equal_to: Time.zone.today }
end
