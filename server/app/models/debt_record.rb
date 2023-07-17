# frozen_string_literal: true

class DebtRecord < ApplicationRecord
  belongs_to :lending_user, class_name: 'User', inverse_of: :lending_debt_records
  belongs_to :borrowing_user, class_name: 'User', inverse_of: :borrowing_debt_records
  belongs_to :expense

  validates :amount_of_money, presence: true, numericality: { greater_than: 0 }
  validates :borrowing_user, uniqueness: { scope: :expense }
  validate :check_lending_user_and_borrowing_user_are_different, if: %i[lending_user borrowing_user]
  validate :check_borrowing_user_belongs_to_payment_group, if: %i[borrowing_user expense]
  validate :check_lending_user_is_same_as_expense_user, if: %i[lending_user expense]
  validate :check_payment_is_completed_when_updating, on: :update

  scope :unpaid, -> { where(is_paid: false) }

  private

  def check_lending_user_and_borrowing_user_are_different
    return if lending_user.id != borrowing_user.id

    errors.add(:borrowing_user, "は#{DebtRecord.human_attribute_name('lending_user')}と同じユーザーにできません")
  end

  def check_borrowing_user_belongs_to_payment_group
    return if expense.payment_group.payment_affiliations.pluck(:user_id).include?(borrowing_user.id)

    errors.add(:borrowing_user, "は#{PaymentGroup.model_name.human}に所属していません")
  end

  def check_lending_user_is_same_as_expense_user
    return if expense.user_id == lending_user.id

    errors.add(:lending_user, 'は支払ったユーザーと同じユーザーにしてください')
  end

  def check_payment_is_completed_when_updating
    errors.add(:base, '返済が完了しているため更新できません') if is_paid_was
  end
end
