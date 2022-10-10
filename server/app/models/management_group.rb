# frozen_string_literal: true

class ManagementGroup < ApplicationRecord
  has_many :management_affiliations, dependent: :destroy
  has_many :users, through: :management_affiliations

  validates :name, presence: true
end
