# frozen_string_literal: true

class ManagementGroup < ApplicationRecord
  validates :name, presence: true
end
