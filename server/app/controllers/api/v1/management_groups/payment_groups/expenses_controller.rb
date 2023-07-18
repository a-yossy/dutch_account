# frozen_string_literal: true

class Api::V1::ManagementGroups::PaymentGroups::ExpensesController < Api::V1::ManagementGroups::PaymentGroups::ApplicationController
  before_action :set_expense, only: %i[show update destroy]

  def index
    render json: ExpenseResource.new(@payment_group.expenses.preload(:debt_records).eager_load(%w[user
                                                                                                  payment_group]).recently_paid).serialize
  end

  def show
    render json: ExpenseResource.new(@expense).serialize
  end

  def bulk_insert
    expenses = ExpenseWithDebtRecordsCreator.new(expenses_params: expenses_params[:expenses], payment_group: @payment_group).call!.expenses
    render json: ExpenseResource.new(expenses).serialize, status: :created
  rescue ExpenseWithDebtRecords::MustHaveAtLeastOneExpenseError,
         ActiveRecord::RecordInvalid => e
    render_bad_request_error(e)
  end

  def update
    expense = ExpenseWithDebtRecordsUpdator.new(expense_params:, expense: @expense, payment_group: @payment_group).call!.expense
    render json: ExpenseResource.new(expense).serialize
  rescue ActiveRecord::RecordInvalid => e
    render_bad_request_error(e)
  end

  def destroy
    @expense.destroy!
    render status: :no_content
  rescue ActiveRecord::RecordNotDestroyed => e
    render_bad_request_error(e)
  end

  private

  def set_expense
    @expense = @payment_group.expenses.find(params[:id])
  end

  def expenses_params
    params.permit(expenses: %i[user_id amount_of_money description paid_on])
  end

  def expense_params
    params.permit(:user_id, :amount_of_money, :description, :paid_on)
  end
end
