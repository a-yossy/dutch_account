# frozen_string_literal: true

class Api::V1::ManagementGroups::DebtRecordsController < Api::V1::ManagementGroups::ApplicationController
  def mark_as_paid
    @management_group.debt_records.unpaid.update(is_paid: true)
    render status: :no_content
  end
end
