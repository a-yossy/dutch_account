# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PaymentGroup, type: :model do
  describe '#check_expenses_exist' do
    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group, management_group:) }
    let(:user) { create(:user) }
    let(:other_user) { create(:user) }

    before do
      create(:management_affiliation, user:, management_group:)
      create(:management_affiliation, user: other_user, management_group:)
      create(:payment_affiliation, user:, payment_group:)
      create(:payment_affiliation, user: other_user, payment_group:)
    end

    context 'when the payment group has no expenses' do
      it 'does not include an error' do
        payment_group = described_class.first
        payment_group.destroy
        expect(payment_group.errors[:base]).to be_empty
      end

      it 'destroys the payment group' do
        expect { described_class.first.destroy }.to change(described_class, :count).by(-1).and change(PaymentAffiliation, :count).by(-2)
      end
    end

    context 'when the payment group has expenses' do
      before do
        ExpensesWithDebtRecordsCreator.new(
          expenses_params: [
            { user_id: user.id, amount_of_money: 1000, description: '食費', paid_on: Time.zone.today }
          ],
          payment_group:
        ).call!
      end

      it 'includes an error' do
        payment_group = described_class.first
        payment_group.destroy
        expect(payment_group.errors[:base]).to include '費用が存在するため削除できません'
      end

      it 'does not destroy the payment group' do
        expect { described_class.first.destroy }.to not_change(described_class, :count).and not_change(Expense, :count)
      end
    end
  end
end
