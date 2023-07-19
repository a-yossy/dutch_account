# frozen_string_literal: true

class Api::V1::ManagementGroups::DebtRecordsController < Api::V1::ManagementGroups::ApplicationController
  def mark_as_paid
    DebtRecordsPaymentCompleter.new(@management_group).call!
    render status: :no_content
  rescue DebtRecords::NotExistUnpaidDebtRecordsError => e
    render_unprocessable_entity_error(e)
  end
end
