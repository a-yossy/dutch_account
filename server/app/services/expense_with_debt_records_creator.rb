# frozen_string_literal: true

class ExpenseWithDebtRecordsCreator
  attr_reader :expenses

  def initialize(expenses_params:, payment_group:)
    @expenses_params = expenses_params
    @payment_group = payment_group
  end

  def call!
    check_exist_at_least_one_expense!
    check_users_belong_to_payment_group!

    ActiveRecord::Base.transaction do
      @expenses = Expense.create!(@expenses_params)

      expenses.each do |expense|
        @payment_group.payment_affiliations.each do |payment_affiliation|
          next if payment_affiliation.user_id == expense.user_id

          expense.debt_records.create!(
            lending_user_id: expense.user_id,
            borrowing_user_id: payment_affiliation.user_id,
            amount_of_money: expense.amount_of_money * payment_affiliation.ratio
          )
        end
      end
    end

    self
  end

  private

  def check_exist_at_least_one_expense!
    return if @expenses_params.size >= 1

    raise ExpenseWithDebtRecords::MustHaveAtLeastOneExpenseError,
          "#{Expense.human_attribute_name('expense')}は1つ以上入力してください"
  end

  def check_users_belong_to_payment_group!
    return if @expenses_params.pluck(:user_id).to_set.subset?(@payment_group.user_ids.map(&:to_s).to_set)

    raise ExpenseWithDebtRecords::NotBelongingToPaymentGroupError,
          "#{PaymentGroup.model_name.human}に所属している#{Expense.human_attribute_name('user')}を入力してください"
  end
end
