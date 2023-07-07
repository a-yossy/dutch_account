# frozen_string_literal: true

class ExpenseWithDebtRecordsUpdator
  attr_reader :expense

  def initialize(expense_params:, expense:, payment_group:)
    @expense_params = expense_params
    @expense = expense
    @payment_group = payment_group
  end

  def call!
    ActiveRecord::Base.transaction do
      expense.update!(@expense_params)
      expense.debt_records.each(&:destroy!)

      @payment_group.payment_affiliations.each do |payment_affiliation|
        next if payment_affiliation.user_id == expense.user_id

        expense.debt_records.create!(
          lending_user_id: expense.user_id,
          borrowing_user_id: payment_affiliation.user_id,
          is_paid: false,
          amount_of_money: expense.amount_of_money.to_d * payment_affiliation.ratio
        )
      end
    end

    self
  end
end
