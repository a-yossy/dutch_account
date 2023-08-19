# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Expense, type: :model do
  describe '#check_user_belongs_to_payment_group' do
    let(:user) { create(:user) }
    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group, management_group:) }

    before do
      create(:management_affiliation, user:, management_group:)
    end

    context 'when the user belongs to the payment group' do
      before do
        create(:payment_affiliation, user:, payment_group:)
      end

      it 'does not include an error' do
        expense = described_class.new(user:, payment_group:, amount_of_money: 1000, description: '食費', paid_on: Time.zone.today)
        expense.valid?
        expect(expense.errors[:user]).to be_empty
      end
    end

    context 'when the user does not belong to the payment group' do
      it 'includes an error' do
        expense = described_class.new(user:, payment_group:, amount_of_money: 1000, description: '食費', paid_on: Time.zone.today)
        expense.valid?
        expect(expense.errors[:user]).to include "は#{PaymentGroup.model_name.human}に所属していません"
      end
    end
  end

  describe '#check_payment_is_completed_when_updating' do
    let(:user) { create(:user) }
    let(:other_user) { create(:user) }
    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group, management_group:) }

    before do
      create(:management_affiliation, user:, management_group:)
      create(:management_affiliation, user: other_user, management_group:)
      create(:payment_affiliation, user:, payment_group:)
      create(:payment_affiliation, user: other_user, payment_group:)
      ExpensesWithDebtRecordsCreator.new(
        expenses_params: [
          { user_id: user.id, amount_of_money: 1000, description: '食費', paid_on: Time.zone.today }
        ],
        payment_group:
      ).call!
    end

    context 'when the payment is completed' do
      before do
        described_class.first.debt_records.update(is_paid: true)
      end

      it 'includes an error' do
        expense = described_class.first
        expense.update(description: '水道代')
        expect(expense.errors[:base]).to include '返済が完了しているため更新できません'
      end
    end

    context 'when the payment is not completed' do
      it 'does not include an error' do
        expense = described_class.first
        expense.update(description: '水道代')
        expect(expense.errors[:base]).to be_empty
      end
    end
  end

  describe '#check_payment_is_completed_when_destroying' do
    let(:user) { create(:user) }
    let(:other_user) { create(:user) }
    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group, management_group:) }

    before do
      create(:management_affiliation, user:, management_group:)
      create(:management_affiliation, user: other_user, management_group:)
      create(:payment_affiliation, user:, payment_group:)
      create(:payment_affiliation, user: other_user, payment_group:)
      ExpensesWithDebtRecordsCreator.new(
        expenses_params: [
          { user_id: user.id, amount_of_money: 1000, description: '食費', paid_on: Time.zone.today }
        ],
        payment_group:
      ).call!
    end

    context 'when the payment is completed' do
      before do
        described_class.first.debt_records.update(is_paid: true)
      end

      it 'includes an error' do
        expense = described_class.first
        expense.destroy
        expect(expense.errors[:base]).to include '返済が完了しているため削除できません'
      end

      it 'does not destroy the expense' do
        expect { described_class.first.destroy }.to not_change(described_class, :count).and not_change(DebtRecord, :count)
      end
    end

    context 'when the payment is not completed' do
      it 'does not include an error' do
        expense = described_class.first
        expense.destroy
        expect(expense.errors[:base]).to be_empty
      end

      it 'destroys the expense' do
        expect { described_class.first.destroy }.to change(described_class, :count).by(-1).and change(DebtRecord, :count).by(-1)
      end
    end
  end
end
