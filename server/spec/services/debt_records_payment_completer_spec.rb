# frozen_string_literal: true

require 'rails_helper'

RSpec.describe DebtRecordsPaymentCompleter do
  describe '#call!' do
    let(:user) { create(:user) }
    let(:other_user) { create(:user) }
    let(:management_group) { create(:management_group) }
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

    context 'when the unpaid debt records do not exist' do
      before do
        management_group.debt_records.update(is_paid: true)
      end

      it 'raises error' do
        expect { described_class.new(management_group).call! }.to raise_error DebtRecords::NotExistUnpaidDebtRecordsError
      end
    end

    context 'when the unpaid debt record exists' do
      it 'marks all debt records as paid' do
        expect { described_class.new(management_group).call! }.to change {
                                                                    management_group.debt_records.where(is_paid: true).count
                                                                  }.from(0).to(1)
      end
    end
  end
end
