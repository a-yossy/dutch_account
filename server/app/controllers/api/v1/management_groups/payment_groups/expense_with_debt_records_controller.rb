# frozen_string_literal: true

class Api::V1::ManagementGroups::PaymentGroups::ExpenseWithDebtRecordsController < ApplicationController
  before_action :authenticate_user!
  before_action :management_group
  before_action :set_payment_group

  def bulk_insert
    expense_with_debt_records = ExpenseWithDebtRecordsCreator.new(expenses_params: expense_with_debt_records_params[:expenses],
                                                                  payment_group: @payment_group).call!
    render json: ExpenseResource.new(expense_with_debt_records.expenses).serialize, status: :created
  rescue ExpenseWithDebtRecords::MustHaveAtLeastOneExpenseError,
         ExpenseWithDebtRecords::NotBelongingToPaymentGroupError,
         ActiveRecord::RecordInvalid => e
    render_bad_request_error(e)
  end

  private

  def management_group
    @management_group = current_user.management_groups.find(params[:management_group_id])
  end

  def set_payment_group
    @payment_group = @management_group.payment_groups.find(params[:payment_group_id])
  end

  def expense_with_debt_records_params
    params.permit(expenses: %i[user_id amount_of_money description paid_on])
  end
end
