# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ManagementGroups::PaymentGroups::ExpenseWithDebtRecordsController, type: :request do
  describe '#bulk_insert' do
    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group) }

    context 'when the user logs in' do
      subject do
        post bulk_insert_api_v1_management_group_payment_group_expense_with_debt_records_path(management_group, payment_group),
             headers: auth_tokens, params:
      end

      let(:user) { create(:user) }
      let(:auth_tokens) { log_in(user) }
      let(:params) { { expenses: [] } }

      context 'when the management_group related to the user does not exist' do
        it 'returns not_found response' do
          expect { subject }.to not_change(Expense, :count).and not_change(DebtRecord, :count)
          assert_response_schema_confirm(404)
        end
      end

      context 'when the management_group related to the user exists' do
        before { create(:management_affiliation, user:, management_group:) }

        context 'when the payment_group related to the management_group does not exist' do
          it 'returns not_found response' do
            expect { subject }.to not_change(Expense, :count).and not_change(DebtRecord, :count)
            assert_response_schema_confirm(404)
          end
        end

        context 'when the payment_group related to the management_group exists' do
          before do
            create(:payment_affiliation, user: other_user, payment_group:)
            create(:payment_affiliation, user:, payment_group:)
          end

          let(:other_user) { create(:user) }
          let(:payment_group) { create(:payment_group, management_group:) }

          context 'with invalid params whose user does not belong to the payment group' do
            let(:wrong_user) { create(:user) }
            let(:params) do
              { expenses: [{ user_id: wrong_user.id.to_s, amount_of_money: 1000, description: '食費', paid_on: Time.zone.today }] }
            end

            it 'returns bad_request response' do
              expect { subject }.to not_change(Expense, :count).and not_change(DebtRecord, :count)
              assert_response_schema_confirm(400)
            end
          end

          context 'with invalid params that have no expenses' do
            let(:params) { { expenses: [] } }

            it 'returns bad_request response' do
              expect { subject }.to not_change(Expense, :count).and not_change(DebtRecord, :count)
              assert_response_schema_confirm(400)
            end
          end

          context 'with invalid params that have tomorrow paid_on' do
            let(:params) do
              { expenses: [{ user_id: user.id.to_s, amount_of_money: 1000, description: '食費', paid_on: Time.zone.tomorrow }] }
            end

            it 'returns bad_request response' do
              expect { subject }.to not_change(Expense, :count).and not_change(DebtRecord, :count)
              assert_response_schema_confirm(400)
            end
          end

          context 'with valid params' do
            let(:params) { { expenses: [{ user_id: user.id.to_s, amount_of_money: 1000, description: '食費', paid_on: Time.zone.today }] } }

            it 'returns success response' do
              expect { subject }.to change(Expense, :count).by(1).and change(DebtRecord, :count).by(1)
              assert_response_schema_confirm(201)
            end
          end
        end
      end
    end

    context 'when the user does not log in' do
      it 'returns unauthorized response' do
        post bulk_insert_api_v1_management_group_payment_group_expense_with_debt_records_path(management_group, payment_group)
        assert_response_schema_confirm(401)
      end
    end
  end
end