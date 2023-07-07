# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ManagementGroups::PaymentGroups::ExpensesController, type: :request do
  describe '#index' do
    subject { get api_v1_management_group_payment_group_expenses_path(management_group, payment_group), headers: auth_tokens }

    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group) }

    context 'when the user logs in' do
      let(:user) { create(:user) }
      let(:auth_tokens) { log_in(user) }

      context 'when the management_group related to the user does not exist' do
        it 'returns not_found response' do
          subject
          assert_response_schema_confirm(404)
        end
      end

      context 'when the management_group related to the user exists' do
        before { create(:management_affiliation, user:, management_group:) }

        context 'when the payment_group related to the management_group does not exist' do
          it 'returns not_found response' do
            subject
            assert_response_schema_confirm(404)
          end
        end

        context 'when the payment_group related to the management_group exists' do
          before do
            create(:payment_affiliation, user:, payment_group:)
            create(:management_affiliation, user: other_user, management_group:)
            create(:payment_affiliation, user: other_user, payment_group:)
            ExpenseWithDebtRecordsCreator.new(
              expenses_params: [
                { user_id: user.id, amount_of_money: 1000, description: '食費', paid_on: Time.zone.today }
              ],
              payment_group:
            ).call!.expenses.first
          end

          let(:other_user) { create(:user) }
          let(:payment_group) { create(:payment_group, management_group:) }

          it 'returns success response' do
            subject
            assert_response_schema_confirm(200)
          end
        end
      end
    end

    context 'when the user does not log in' do
      let(:auth_tokens) { nil }

      it 'returns unauthorized response' do
        subject
        assert_response_schema_confirm(401)
      end
    end
  end

  describe '#show' do
    subject { get api_v1_management_group_payment_group_expense_path(management_group, payment_group, expense), headers: auth_tokens }

    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group) }
    let(:other_payment_group) { create(:payment_group, management_group:) }
    let(:other_user) { create(:user) }
    let(:other_user2) { create(:user) }
    let(:expense) do
      ExpenseWithDebtRecordsCreator.new(
        expenses_params: [
          { user_id: other_user.id, amount_of_money: 1000, description: '食費', paid_on: Time.zone.today }
        ],
        payment_group: other_payment_group
      ).call!.expenses.first
    end

    before do
      create(:management_affiliation, user: other_user, management_group:)
      create(:management_affiliation, user: other_user2, management_group:)
      create(:payment_affiliation, user: other_user, payment_group: other_payment_group)
      create(:payment_affiliation, user: other_user2, payment_group: other_payment_group)
    end

    context 'when the user logs in' do
      let(:user) { create(:user) }
      let(:auth_tokens) { log_in(user) }

      context 'when the management_group related to the user does not exist' do
        it 'returns not_found response' do
          subject
          assert_response_schema_confirm(404)
        end
      end

      context 'when the management_group related to the user exists' do
        before { create(:management_affiliation, user:, management_group:) }

        context 'when the payment_group related to the management_group does not exist' do
          it 'returns not_found response' do
            subject
            assert_response_schema_confirm(404)
          end
        end

        context 'when the payment_group related to the management_group exists' do
          before do
            create(:payment_affiliation, user:, payment_group:)
          end

          let(:payment_group) { create(:payment_group, management_group:) }

          context 'when the expense related to the payment_group does not exist' do
            it 'returns not_found response' do
              subject
              assert_response_schema_confirm(404)
            end
          end

          context 'when the expense related to the payment_group exists' do
            let(:user2) { create(:user) }
            let(:expense) do
              ExpenseWithDebtRecordsCreator.new(
                expenses_params: [
                  { user_id: user.id, amount_of_money: 1000, description: '食費', paid_on: Time.zone.today }
                ],
                payment_group:
              ).call!.expenses.first
            end

            before do
              create(:management_affiliation, user: user2, management_group:)
              create(:payment_affiliation, user: user2, payment_group:)
            end

            it 'returns success response' do
              subject
              assert_response_schema_confirm(200)
            end
          end
        end
      end
    end

    context 'when the user does not log in' do
      let(:auth_tokens) { nil }

      it 'returns unauthorized response' do
        subject
        assert_response_schema_confirm(401)
      end
    end
  end

  describe '#bulk_insert' do
    subject do
      post bulk_insert_api_v1_management_group_payment_group_expenses_path(management_group, payment_group),
           headers: auth_tokens, params:
    end

    let(:params) { { expenses: [] } }
    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group) }

    context 'when the user logs in' do
      let(:user) { create(:user) }
      let(:auth_tokens) { log_in(user) }

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
            create(:management_affiliation, user: other_user, management_group:)
            create(:payment_affiliation, user:, payment_group:)
            create(:payment_affiliation, user: other_user, payment_group:)
          end

          let(:other_user) { create(:user) }
          let(:payment_group) { create(:payment_group, management_group:) }

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
      let(:auth_tokens) { nil }

      it 'returns unauthorized response' do
        subject
        assert_response_schema_confirm(401)
      end
    end
  end

  describe '#update' do
    subject do
      put api_v1_management_group_payment_group_expense_path(management_group, payment_group, expense), headers: auth_tokens, params:
    end

    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group) }
    let(:other_payment_group) { create(:payment_group, management_group:) }
    let(:other_user) { create(:user) }
    let(:other_user2) { create(:user) }
    let(:expense) do
      ExpenseWithDebtRecordsCreator.new(
        expenses_params: [
          { user_id: other_user.id, amount_of_money: 1000, description: '食費', paid_on: Time.zone.today }
        ],
        payment_group: other_payment_group
      ).call!.expenses.first
    end
    let(:params) { {} }

    before do
      create(:management_affiliation, user: other_user, management_group:)
      create(:management_affiliation, user: other_user2, management_group:)
      create(:payment_affiliation, user: other_user, payment_group: other_payment_group)
      create(:payment_affiliation, user: other_user2, payment_group: other_payment_group)
    end

    context 'when the user logs in' do
      let(:user) { create(:user) }
      let(:auth_tokens) { log_in(user) }

      context 'when the management_group related to the user does not exist' do
        it 'returns not_found response' do
          subject
          expect do
            expense = Expense.find_by(user: other_user)
            DebtRecord.find_by!(lending_user: other_user, borrowing_user: other_user2, expense:)
          end.not_to raise_error
          assert_response_schema_confirm(404)
        end
      end

      context 'when the management_group related to the user exists' do
        before { create(:management_affiliation, user:, management_group:) }

        context 'when the payment_group related to the management_group does not exist' do
          it 'returns not_found response' do
            subject
            expect do
              expense = Expense.find_by(user: other_user)
              DebtRecord.find_by!(lending_user: other_user, borrowing_user: other_user2, expense:)
            end.not_to raise_error
            assert_response_schema_confirm(404)
          end
        end

        context 'when the payment_group related to the management_group exists' do
          before { create(:payment_affiliation, user:, payment_group:) }

          let(:payment_group) { create(:payment_group, management_group:) }

          context 'when the expense related to the payment_group does not exist' do
            it 'returns not_found response' do
              subject
              expect do
                expense = Expense.find_by(user: other_user)
                DebtRecord.find_by!(lending_user: other_user, borrowing_user: other_user2, expense:)
              end.not_to raise_error
              assert_response_schema_confirm(404)
            end
          end

          context 'when the expense related to the payment_group exists' do
            let(:user2) { create(:user) }
            let(:expense) do
              ExpenseWithDebtRecordsCreator.new(
                expenses_params: [
                  { user_id: user.id, amount_of_money: 1000, description: '食費', paid_on: Time.zone.today }
                ],
                payment_group:
              ).call!.expenses.first
            end

            before do
              create(:management_affiliation, user: user2, management_group:)
              create(:payment_affiliation, user: user2, payment_group:)
            end

            context 'with invalid params that have tomorrow paid_on' do
              let(:params) { { user_id: user.id.to_s, amount_of_money: 1000, description: '食費', paid_on: Time.zone.tomorrow } }

              it 'returns bad_request response' do
                subject
                expect do
                  expense = Expense.find_by(user:)
                  DebtRecord.find_by!(lending_user: user, borrowing_user: user2, expense:)
                end.not_to raise_error
                assert_response_schema_confirm(400)
              end
            end

            context 'with valid params' do
              let(:params) { { user_id: user2.id.to_s, amount_of_money: 1000, description: '食費', paid_on: Time.zone.today } }

              it 'returns success response' do
                subject
                expect do
                  expense = Expense.find_by(user: user2)
                  DebtRecord.find_by!(lending_user: user2, borrowing_user: user, expense:)
                end.not_to raise_error
                assert_response_schema_confirm(200)
              end
            end
          end
        end
      end
    end

    context 'when the user does not log in' do
      let(:auth_tokens) { nil }

      it 'returns unauthorized response' do
        subject
        expect do
          expense = Expense.find_by(user: other_user)
          DebtRecord.find_by!(lending_user: other_user, borrowing_user: other_user2, expense:)
        end.not_to raise_error
        assert_response_schema_confirm(401)
      end
    end
  end
end
