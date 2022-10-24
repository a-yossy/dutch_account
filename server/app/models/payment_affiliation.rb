# frozen_string_literal: true

class PaymentAffiliation < ApplicationRecord
  belongs_to :user
  belongs_to :payment_group

  validates :user, uniqueness: { scope: :payment_group }
  validates :ratio, presence: true, numericality: { greater_than: 0, less_than: 1 }
end
