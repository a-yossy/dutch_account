# frozen_string_literal: true

class ManagementAffiliation < ApplicationRecord
  belongs_to :user
  belongs_to :management_group

  validates :user, uniqueness: { scope: :management_group }
end
