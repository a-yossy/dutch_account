# frozen_string_literal: true

class PaymentAffiliation < ApplicationRecord
  belongs_to :user
  belongs_to :payment_group

  validates :user, uniqueness: { scope: :payment_group }
  validates :ratio, presence: true, numericality: { greater_than: 0, less_than: 1 }
  validate :check_user_belongs_to_management_group, if: :payment_group

  private

  def check_user_belongs_to_management_group
    return if payment_group.management_group.management_affiliations.pluck(:user_id).include?(user_id)

    errors.add(:user, "は#{ManagementGroup.model_name.human}に所属していません")
  end
end
