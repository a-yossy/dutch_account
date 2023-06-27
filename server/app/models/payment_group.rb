# frozen_string_literal: true

class PaymentGroup < ApplicationRecord
  belongs_to :management_group

  has_many :payment_affiliations, dependent: :destroy
  has_many :users, through: :payment_affiliations
  has_many :expenses, dependent: :destroy

  scope :alphabetical_order, -> { order(:name) }

  validates :name, presence: true, length: { maximum: 50 }, uniqueness: { scope: :management_group }
end
