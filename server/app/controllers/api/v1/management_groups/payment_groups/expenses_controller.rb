# frozen_string_literal: true

class Api::V1::ManagementGroups::PaymentGroups::ExpensesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_management_group
  before_action :set_payment_group

  def index
    render json: ExpenseResource.new(@payment_group.expenses.recently_paid).serialize
  end

  def show
    render json: ExpenseResource.new(@payment_group.expenses.find(params[:id])).serialize
  end

  def bulk_insert
    expenses = ExpenseWithDebtRecordsCreator.new(expenses_params: expenses_params[:expenses], payment_group: @payment_group).call!.expenses
    render json: ExpenseResource.new(expenses).serialize, status: :created
  rescue ExpenseWithDebtRecords::MustHaveAtLeastOneExpenseError,
         ExpenseWithDebtRecords::NotBelongingToPaymentGroupError,
         ActiveRecord::RecordInvalid => e
    render_bad_request_error(e)
  end

  private

  def set_management_group
    @management_group = current_user.management_groups.find(params[:management_group_id])
  end

  def set_payment_group
    @payment_group = @management_group.payment_groups.find(params[:payment_group_id])
  end

  def expenses_params
    params.permit(expenses: %i[user_id amount_of_money description paid_on])
  end
end
