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
end
