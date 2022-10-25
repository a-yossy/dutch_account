# frozen_string_literal: true

class ManagementGroup < ApplicationRecord
  has_many :payment_groups, dependent: :destroy
  has_many :management_affiliations, dependent: :destroy
  has_many :users, through: :management_affiliations

  scope :alphabetical_order, -> { order(:name) }

  validates :name, presence: true, length: { maximum: 50 }
end
