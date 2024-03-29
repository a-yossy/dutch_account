# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ManagementGroups::PaymentGroups::ExpensesController, type: :request do
  describe '#index' do
    subject { get api_v1_management_group_payment_group_expenses_path(management_group, payment_group), headers: auth_tokens }

    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group) }
    let(:user) { create(:user) }
    let(:auth_tokens) { log_in(user) }

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
        ExpensesWithDebtRecordsCreator.new(
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

  describe '#show' do
    subject { get api_v1_management_group_payment_group_expense_path(management_group, payment_group, expense), headers: auth_tokens }

    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group, management_group:) }
    let(:other_payment_group) { create(:payment_group, management_group:) }
    let(:other_user) { create(:user) }
    let(:other_user2) { create(:user) }
    let(:user) { create(:user) }
    let(:user2) { create(:user) }
    let(:auth_tokens) { log_in(user) }
    let(:expense) do
      ExpensesWithDebtRecordsCreator.new(
        expenses_params: [
          { user_id: other_user.id, amount_of_money: 1000, description: '食費', paid_on: Time.zone.today }
        ],
        payment_group: other_payment_group
      ).call!.expenses.first
    end

    before do
      create(:management_affiliation, user: other_user, management_group:)
      create(:management_affiliation, user: other_user2, management_group:)
      create(:management_affiliation, user:, management_group:)
      create(:management_affiliation, user: user2, management_group:)
      create(:payment_affiliation, user: other_user, payment_group: other_payment_group)
      create(:payment_affiliation, user: other_user2, payment_group: other_payment_group)
      create(:payment_affiliation, user:, payment_group:)
      create(:payment_affiliation, user: user2, payment_group:)
    end

    context 'when the expense related to the payment_group does not exist' do
      it 'returns not_found response' do
        subject
        assert_response_schema_confirm(404)
      end
    end

    context 'when the expense related to the payment_group exists' do
      let(:expense) do
        ExpensesWithDebtRecordsCreator.new(
          expenses_params: [
            { user_id: user.id, amount_of_money: 1000, description: '食費', paid_on: Time.zone.today }
          ],
          payment_group:
        ).call!.expenses.first
      end

      it 'returns success response' do
        subject
        assert_response_schema_confirm(200)
      end
    end
  end

  describe '#bulk_insert' do
    subject do
      post bulk_insert_api_v1_management_group_payment_group_expenses_path(management_group, payment_group),
           headers: auth_tokens, params:
    end

    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group, management_group:) }
    let(:user) { create(:user) }
    let(:auth_tokens) { log_in(user) }
    let(:other_user) { create(:user) }

    before do
      create(:management_affiliation, user:, management_group:)
      create(:management_affiliation, user: other_user, management_group:)
      create(:payment_affiliation, user:, payment_group:)
      create(:payment_affiliation, user: other_user, payment_group:)
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

  describe '#update' do
    subject do
      patch api_v1_management_group_payment_group_expense_path(management_group, payment_group, expense), headers: auth_tokens, params:
    end

    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group, management_group:) }
    let(:user) { create(:user) }
    let(:auth_tokens) { log_in(user) }
    let(:user2) { create(:user) }
    let(:expense) do
      ExpensesWithDebtRecordsCreator.new(
        expenses_params: [
          { user_id: user.id, amount_of_money: 1000, description: '食費', paid_on: Time.zone.today }
        ],
        payment_group:
      ).call!.expenses.first
    end

    before do
      create(:management_affiliation, user:, management_group:)
      create(:management_affiliation, user: user2, management_group:)
      create(:payment_affiliation, user:, payment_group:)
      create(:payment_affiliation, user: user2, payment_group:)
    end

    context 'with invalid params that have tomorrow paid_on' do
      let(:params) { { user_id: user.id.to_s, amount_of_money: 1000, description: '食費', paid_on: Time.zone.tomorrow } }

      it 'returns bad_request response' do
        subject
        assert_response_schema_confirm(400)
      end
    end

    context 'with valid params' do
      let(:params) { { user_id: user2.id.to_s, amount_of_money: 1000, description: '食費', paid_on: Time.zone.today } }

      it 'returns success response' do
        expect { subject }.to change { Expense.find(expense.id).user_id }.from(user.id).to(user2.id)
        assert_response_schema_confirm(200)
      end
    end
  end

  describe '#destroy' do
    subject { delete api_v1_management_group_payment_group_expense_path(management_group, payment_group, expense), headers: auth_tokens }

    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group, management_group:) }
    let(:user) { create(:user) }
    let(:auth_tokens) { log_in(user) }
    let(:user2) { create(:user) }
    let(:expense) do
      ExpensesWithDebtRecordsCreator.new(
        expenses_params: [
          { user_id: user.id, amount_of_money: 1000, description: '食費', paid_on: Time.zone.today }
        ],
        payment_group:
      ).call!.expenses.first
    end

    before do
      create(:management_affiliation, user:, management_group:)
      create(:management_affiliation, user: user2, management_group:)
      create(:payment_affiliation, user:, payment_group:)
      create(:payment_affiliation, user: user2, payment_group:)
    end

    context 'when payment of the debt records of the expense is completed' do
      before do
        expense.debt_records.update(is_paid: true)
      end

      it 'returns bad_request response' do
        expense
        expect { subject }.to not_change(Expense, :count).and not_change(DebtRecord, :count)
        assert_response_schema_confirm(400)
      end
    end

    context 'when payment of the debt records of the expense is not completed' do
      it 'returns no_content response' do
        expense
        expect { subject }.to change(Expense, :count).by(-1).and change(DebtRecord, :count).by(-1)
        assert_response_schema_confirm(204)
      end
    end
  end
end
