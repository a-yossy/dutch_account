# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ManagementGroups::DebtRecordsController, type: :request do
  describe '#mark_as_paid' do
    subject { patch mark_as_paid_api_v1_management_group_debt_records_path(management_group), headers: auth_tokens }

    let(:management_group) { create(:management_group) }

    context 'when the user logs in' do
      let(:user) { create(:user) }
      let(:auth_tokens) { log_in(user) }

      context 'when the management_group related to the user does not exist' do
        it 'returns not_found response' do
          expect { subject }.not_to change(management_group.debt_records.where(is_paid: true), :count)
          assert_response_schema_confirm(404)
        end
      end

      context 'when the management_group related to the user exists' do
        let(:other_user) { create(:user) }
        let(:payment_group) { create(:payment_group, management_group:) }

        before do
          create(:management_affiliation, user:, management_group:)
          create(:management_affiliation, user: other_user, management_group:)
          create(:payment_affiliation, payment_group:, user:)
          create(:payment_affiliation, payment_group:, user: other_user)
          ExpensesWithDebtRecordsCreator.new(
            expenses_params: [
              { user_id: user.id, amount_of_money: 1000, description: '食費', paid_on: Time.zone.today }
            ],
            payment_group:
          ).call!
        end

        context 'when the unpaid debt record does not exist' do
          before do
            DebtRecordsPaymentCompleter.new(management_group).call!
          end

          it 'returns unprocessable_entity response' do
            expect { subject }.not_to change(management_group.debt_records.where(is_paid: true), :count)
            assert_response_schema_confirm(422)
          end
        end

        context 'when the unpaid debt record exists' do
          it 'returns no_content response' do
            expect { subject }.to change { management_group.debt_records.where(is_paid: true).count }.from(0).to(1)
            assert_response_schema_confirm(204)
          end
        end
      end
    end

    context 'when the user does not log in' do
      let(:auth_tokens) { nil }

      it 'returns unauthorized response' do
        expect { subject }.not_to change(management_group.debt_records.where(is_paid: true), :count)
        assert_response_schema_confirm(401)
      end
    end
  end
end
