# frozen_string_literal: true

class DebtRecordsPaymentCompleter
  def initialize(management_group)
    @unpaid_debt_records = management_group.debt_records.unpaid
  end

  def call!
    check_exist_at_least_unpaid_debt_record!
    @unpaid_debt_records.update(is_paid: true)
  end

  private

  def check_exist_at_least_unpaid_debt_record!
    return if @unpaid_debt_records.size >= 1

    raise DebtRecords::NotExistUnpaidDebtRecordsError, "未払いの#{DebtRecord.model_name.human}が存在しません"
  end
end
