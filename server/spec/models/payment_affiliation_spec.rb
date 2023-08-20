# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PaymentAffiliation, type: :model do
  describe '#check_user_belongs_to_management_group' do
    let(:user) { create(:user) }
    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group, management_group:) }

    context 'when the user belongs to the management group' do
      before do
        create(:management_affiliation, user:, management_group:)
      end

      it 'does not include an error' do
        payment_affiliation = described_class.new(user:, payment_group:, ratio: 0.5)
        payment_affiliation.valid?
        expect(payment_affiliation.errors[:user]).to be_empty
      end
    end

    context 'when the user does not belong to the management group' do
      it 'includes an error' do
        payment_affiliation = described_class.new(user:, payment_group:, ratio: 0.5)
        payment_affiliation.valid?
        expect(payment_affiliation.errors[:user]).to include "は#{ManagementGroup.model_name.human}に所属していません"
      end
    end
  end

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
        payment_group_affiliation = described_class.first
        payment_group_affiliation.destroy
        expect(payment_group_affiliation.errors[:base]).to be_empty
      end

      it 'destroys the payment group' do
        expect { described_class.first.destroy }.to change(described_class, :count).by(-1)
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
        payment_group_affiliation = described_class.first
        payment_group_affiliation.destroy
        expect(payment_group_affiliation.errors[:base]).to include '費用が存在するため削除できません'
      end

      it 'does not destroy the payment group' do
        expect { described_class.first.destroy }.to not_change(described_class, :count)
      end
    end
  end
end
