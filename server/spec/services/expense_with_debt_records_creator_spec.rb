# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ExpenseWithDebtRecordsCreator do
  describe '#call!' do
    let(:user1) { create(:user, name: 'user_1') }
    let(:user2) { create(:user, name: 'user_2') }
    let(:user3) { create(:user, name: 'user_3') }
    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group, management_group:) }
    let(:expense_with_debt_records_creator) do
      described_class.new(expenses_params:, payment_group:)
    end

    before do
      create(:management_affiliation, user: user1, management_group:)
      create(:management_affiliation, user: user2, management_group:)
      create(:management_affiliation, user: user3, management_group:)
      create(:payment_affiliation, user: user1, payment_group:, ratio: 0.34)
      create(:payment_affiliation, user: user2, payment_group:, ratio: 0.34)
      create(:payment_affiliation, user: user3, payment_group:, ratio: 0.32)
    end

    context 'with valid arguments' do
      let(:expenses_params) { [{ user_id: user1.id.to_s, amount_of_money: 1111, description: '食費', paid_on: Time.zone.today }] }

      it 'creates one expense and two debt_records' do
        expect do
          expense_with_debt_records_creator.call!
        end.to change(Expense, :count).by(1).and change(DebtRecord, :count).by(2)
      end

      it 'returns expense_with_debt_records_creator instance that have expenses' do
        expense_with_debt_records = expense_with_debt_records_creator.call!
        expect(expense_with_debt_records.instance_of?(described_class)).to eq(true)
        expect(expense_with_debt_records.expenses).to eq([Expense.first])
      end

      it 'creates debt_records with correct amount_of_money' do
        expense_with_debt_records_creator.call!
        expect(DebtRecord.find_by(lending_user: user1, borrowing_user: user2, expense: Expense.first).amount_of_money).to eq(377.74)
        expect(DebtRecord.find_by(lending_user: user1, borrowing_user: user3, expense: Expense.first).amount_of_money).to eq(355.52)
      end
    end

    context 'with invalid arguments that have tomorrow paid_on' do
      let(:expenses_params) { [{ user_id: user1.id.to_s, amount_of_money: 1111, description: '食費', paid_on: Time.zone.tomorrow }] }

      it 'raises error' do
        expect do
          expense_with_debt_records_creator.call!
        end.to not_change(Expense, :count)
          .and not_change(DebtRecord, :count)
          .and raise_error ActiveRecord::RecordInvalid
      end
    end

    context 'with invalid arguments that have no expenses' do
      let(:expenses_params) { [] }

      it 'raises error' do
        expect do
          expense_with_debt_records_creator.call!
        end.to not_change(Expense, :count)
          .and not_change(DebtRecord, :count)
          .and raise_error ExpenseWithDebtRecords::MustHaveAtLeastOneExpenseError
      end
    end
  end
end
