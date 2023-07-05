# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TotalBorrowingAndLendingGetter do
  describe '#call' do
    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group, management_group:) }
    let(:user) { create(:user) }
    let(:user2) { create(:user) }
    let(:user3) { create(:user) }

    before do
      create(:management_affiliation, user:, management_group:)
      create(:management_affiliation, user: user2, management_group:)
      create(:management_affiliation, user: user3, management_group:)
      create(:payment_affiliation, user:, payment_group:, ratio: 0.6)
      create(:payment_affiliation, user: user2, payment_group:, ratio: 0.3)
      create(:payment_affiliation, user: user3, payment_group:, ratio: 0.1)
    end

    context 'when management group has no expenses' do
      it 'returns an array of hashes with user_id and amount_of_money' do
        expect(described_class.new(management_group).call).to eq [
          { user_id: user.id, amount_of_money: 0 },
          { user_id: user2.id, amount_of_money: 0 },
          { user_id: user3.id, amount_of_money: 0 }
        ]
      end
    end

    context 'when management group has expenses without unpaid' do
      before do
        ExpenseWithDebtRecordsCreator.new(
          expenses_params: [
            { user_id: user.id, amount_of_money: 1000, description: '食費', paid_on: Time.zone.today },
            { user_id: user2.id, amount_of_money: 2000, description: '水道代', paid_on: Time.zone.yesterday },
            { user_id: user3.id, amount_of_money: 3000, description: '電気代', paid_on: Time.zone.today }
          ],
          payment_group:
        ).call!
      end

      # user1: 1000 * (1 - 0.6) - 2000 * 0.6 - 3000 * 0.6 = -2600
      # user2: -1000 * 0.3 + 2000 * (1 - 0.3) - 3000 * 0.3 = 200
      # user3: -1000 * 0.1 - 2000 * 0.1 + 3000 * (1 - 0.1) = 2400
      it 'returns an array of hashes with user_id and amount_of_money' do
        expect(described_class.new(management_group).call).to eq [
          { user_id: user.id, amount_of_money: -2600 },
          { user_id: user2.id, amount_of_money: 200 },
          { user_id: user3.id, amount_of_money: 2400 }
        ]
      end

      it 'returns the sum of amount_of_money is 0' do
        expect(described_class.new(management_group).call.sum { |expense| expense[:amount_of_money] }).to eq 0
      end
    end

    context 'when management group has expenses with unpaid' do
      before do
        ExpenseWithDebtRecordsCreator.new(
          expenses_params: [
            { user_id: user.id, amount_of_money: 1000, description: '食費', paid_on: Time.zone.today },
            { user_id: user2.id, amount_of_money: 2000, description: '水道代', paid_on: Time.zone.yesterday },
            { user_id: user3.id, amount_of_money: 3000, description: '電気代', paid_on: Time.zone.today },
            { user_id: user.id, amount_of_money: 1111, description: '食費', paid_on: Time.zone.today },
            { user_id: user2.id, amount_of_money: 2222, description: '水道代', paid_on: Time.zone.yesterday },
            { user_id: user3.id, amount_of_money: 3333, description: '電気代', paid_on: Time.zone.today }
          ],
          payment_group:
        ).call!

        Expense.where(user_id: user.id).first.debt_records.update!(is_paid: true)
        Expense.where(user_id: user2.id).first.debt_records.update!(is_paid: true)
        Expense.where(user_id: user3.id).first.debt_records.update!(is_paid: true)
      end

      # user1: 1111 * (1 - 0.6) - 2222 * 0.6 - 3333 * 0.6 = -2888.6
      # user2: -1111 * 0.3 + 2222 * (1 - 0.3) - 3333 * 0.3 = 222.2
      # user3: -1111 * 0.1 - 2222 * 0.1 + 3333 * (1 - 0.1) = 2666.4
      it 'returns an array of hashes with user_id and amount_of_money' do
        expect(described_class.new(management_group).call).to eq [
          { user_id: user.id, amount_of_money: -2888.6 },
          { user_id: user2.id, amount_of_money: 222.2 },
          { user_id: user3.id, amount_of_money: 2666.4 }
        ]
      end

      it 'returns the sum of amount_of_money is 0' do
        expect(described_class.new(management_group).call.sum { |expense| expense[:amount_of_money] }).to eq 0
      end
    end
  end
end
