# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ExpenseWithDebtRecordsUpdator do
  describe '#call!' do
    let(:user1) { create(:user) }
    let(:user2) { create(:user) }
    let(:user3) { create(:user) }
    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group, management_group:) }
    let(:expense_with_debt_records_updator) do
      described_class.new(expense_params:, expense:, payment_group:)
    end

    before do
      create(:management_affiliation, user: user1, management_group:)
      create(:management_affiliation, user: user2, management_group:)
      create(:management_affiliation, user: user3, management_group:)
      create(:payment_affiliation, user: user1, payment_group:, ratio: 0.5)
      create(:payment_affiliation, user: user2, payment_group:, ratio: 0.3)
      create(:payment_affiliation, user: user3, payment_group:, ratio: 0.2)
      ExpenseWithDebtRecordsCreator.new(
        expenses_params: [
          { user_id: user1.id, amount_of_money: 1000, description: '食費', paid_on: Time.zone.today }
        ],
        payment_group:
      ).call!
    end

    context 'with valid arguments' do
      let(:expense_params) { { user_id: user2.id, amount_of_money: 1111, description: '食費', paid_on: Time.zone.today } }
      let(:expense) { Expense.first }

      it 'updates one expense and destroy two debt_records and create two debt_records' do
        expect do
          expense = Expense.find_by!(user: user1)
          DebtRecord.find_by!(lending_user: user1, borrowing_user: user2, expense:)
          DebtRecord.find_by!(lending_user: user1, borrowing_user: user3, expense:)
        end.not_to raise_error
        expense_with_debt_records_updator.call!
        expect(Expense.count).to eq(1)
        expect(DebtRecord.count).to eq(2)
        expect do
          expense = Expense.find_by!(user: user2)
          DebtRecord.find_by!(lending_user: user2, borrowing_user: user1, expense:)
          DebtRecord.find_by!(lending_user: user2, borrowing_user: user3, expense:)
        end.not_to raise_error
      end

      it 'returns expense_with_debt_records_updator instance that have expense' do
        expense_with_debt_records = expense_with_debt_records_updator.call!
        expect(expense_with_debt_records.instance_of?(described_class)).to eq(true)
        expect(expense_with_debt_records.expense).to eq(Expense.find_by(user: user2))
      end

      it 'creates debt_records with correct amount_of_money' do
        expense_with_debt_records_updator.call!
        expect(DebtRecord.find_by(lending_user: user2, borrowing_user: user1, expense: Expense.first).amount_of_money).to eq(555.5)
        expect(DebtRecord.find_by(lending_user: user2, borrowing_user: user3, expense: Expense.first).amount_of_money).to eq(222.2)
      end
    end

    context 'with invalid arguments that have tomorrow paid_on' do
      let(:expense_params) { { user_id: user2.id, amount_of_money: 1111, description: '食費', paid_on: Time.zone.tomorrow } }
      let(:expense) { Expense.first }

      it 'raises error' do
        expect { expense_with_debt_records_updator.call! }.to raise_error ActiveRecord::RecordInvalid
        expect do
          expense = Expense.find_by!(user: user1)
          DebtRecord.find_by!(lending_user: user1, borrowing_user: user2, expense:)
          DebtRecord.find_by!(lending_user: user1, borrowing_user: user3, expense:)
        end.not_to raise_error
      end
    end
  end
end
