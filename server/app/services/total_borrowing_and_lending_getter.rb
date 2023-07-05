# frozen_string_literal: true

class TotalBorrowingAndLendingGetter
  def initialize(management_group)
    @management_group = management_group
    @unpaid_debt_records = @management_group.debt_records.unpaid
  end

  def call
    lending_totals = calculate_totals(@unpaid_debt_records.group(:lending_user_id))
    borrowing_totals = calculate_totals(@unpaid_debt_records.group(:borrowing_user_id))
    @management_group.user_ids.sort.map do |user_id|
      {
        user_id:,
        amount_of_money: lending_totals[user_id].to_d - borrowing_totals[user_id].to_d
      }
    end
  end

  private

  def calculate_totals(grouped_debt_records)
    grouped_debt_records.sum(:amount_of_money)
  end
end
