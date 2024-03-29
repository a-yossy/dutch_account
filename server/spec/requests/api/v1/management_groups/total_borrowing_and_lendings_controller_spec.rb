# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ManagementGroups::TotalBorrowingAndLendingsController, type: :request do
  describe '#index' do
    subject { get api_v1_management_group_total_borrowing_and_lendings_path(management_group), headers: auth_tokens }

    let(:management_group) { create(:management_group) }
    let(:user) { create(:user) }
    let(:auth_tokens) { log_in(user) }
    let(:other_user) { create(:user) }
    let(:payment_group) { create(:payment_group, management_group:) }

    before do
      create(:management_affiliation, user:, management_group:)
      create(:management_affiliation, user: other_user, management_group:)
      create(:payment_affiliation, user:, payment_group:)
      create(:payment_affiliation, user: other_user, payment_group:)

      ExpensesWithDebtRecordsCreator.new(
        expenses_params: [
          { user_id: user.id, amount_of_money: 1000, description: '食費', paid_on: Time.zone.today },
          { user_id: other_user.id, amount_of_money: 2000, description: '水道代', paid_on: Time.zone.yesterday }
        ],
        payment_group:
      ).call!
    end

    it 'returns success response' do
      subject
      assert_response_schema_confirm(200)
    end
  end
end
