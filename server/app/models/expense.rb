# frozen_string_literal: true

class Expense < ApplicationRecord
  belongs_to :user
  belongs_to :payment_group

  has_many :debt_records, dependent: :destroy

  scope :recently_paid, -> { order(paid_on: :desc, id: :desc) }

  validates :amount_of_money, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :description, presence: true, length: { maximum: 255 }
  validates :paid_on, presence: true, comparison: { less_than_or_equal_to: Time.zone.today }
  validate :check_user_belongs_to_payment_group, if: %i[user payment_group]
  validate :check_payment_is_completed_when_updating, on: :update

  before_destroy :check_payment_is_completed_when_destroying, prepend: true

  private

  def check_user_belongs_to_payment_group
    return if payment_group.payment_affiliations.pluck(:user_id).include?(user.id)

    errors.add(:user, "は#{PaymentGroup.model_name.human}に所属していません")
  end

  def check_payment_is_completed_when_updating
    errors.add(:base, '返済が完了しているため更新できません') if debt_records.any?(&:is_paid)
  end

  def check_payment_is_completed_when_destroying
    return unless debt_records.any?(&:is_paid)

    errors.add(:base, '返済が完了しているため削除できません')
    throw :abort
  end
end
