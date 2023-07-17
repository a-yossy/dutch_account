# frozen_string_literal: true

require 'rails_helper'

RSpec.describe DebtRecord, type: :model do
  describe '#check_lending_user_and_borrowing_user_are_different' do
    let(:user) { create(:user) }
    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group, management_group:) }
    let(:expense) { create(:expense, user:, payment_group:) }

    before do
      create(:management_affiliation, user:, management_group:)
      create(:payment_affiliation, user:, payment_group:)
    end

    context 'when lending_user and borrowing_user are different' do
      let(:other_user) { create(:user) }

      before do
        create(:management_affiliation, user: other_user, management_group:)
        create(:payment_affiliation, user: other_user, payment_group:)
      end

      it 'does not include an error' do
        debt_record = described_class.new(lending_user: user, borrowing_user: other_user, expense:, amount_of_money: 1000)
        debt_record.valid?
        expect(debt_record.errors[:borrowing_user]).to be_empty
      end
    end

    context 'when lending_user and borrowing_user are same' do
      it 'includes an error' do
        debt_record = described_class.new(lending_user: user, borrowing_user: user, expense:, amount_of_money: 1000)
        debt_record.valid?
        expect(debt_record.errors[:borrowing_user]).to include "は#{described_class.human_attribute_name('lending_user')}と同じユーザーにできません"
      end
    end
  end

  describe '#check_borrowing_user_belongs_to_payment_group' do
    let(:user) { create(:user) }
    let(:other_user) { create(:user) }
    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group, management_group:) }
    let(:expense) { create(:expense, user:, payment_group:) }

    before do
      create(:management_affiliation, user:, management_group:)
      create(:payment_affiliation, user:, payment_group:)
    end

    context 'when borrowing_user belongs to the payment group' do
      before do
        create(:management_affiliation, user: other_user, management_group:)
        create(:payment_affiliation, user: other_user, payment_group:)
      end

      it 'does not include an error' do
        debt_record = described_class.new(lending_user: user, borrowing_user: other_user, expense:, amount_of_money: 1000)
        debt_record.valid?
        expect(debt_record.errors[:lending_user]).to be_empty
      end
    end

    context 'when borrowing_user does not belong to the payment group' do
      it 'includes an error' do
        debt_record = described_class.new(lending_user: user, borrowing_user: other_user, expense:, amount_of_money: 1000)
        debt_record.valid?
        expect(debt_record.errors[:borrowing_user]).to include "は#{PaymentGroup.model_name.human}に所属していません"
      end
    end
  end

  describe '#check_lending_user_is_same_as_expense_user' do
    let(:user) { create(:user) }
    let(:other_user) { create(:user) }
    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group, management_group:) }

    before do
      create(:management_affiliation, user:, management_group:)
      create(:payment_affiliation, user:, payment_group:)
      create(:management_affiliation, user: other_user, management_group:)
      create(:payment_affiliation, user: other_user, payment_group:)
    end

    context 'when lending_user is same as expense user' do
      let(:expense) { create(:expense, user:, payment_group:) }

      it 'does not include an error' do
        debt_record = described_class.new(lending_user: user, borrowing_user: other_user, expense:, amount_of_money: 1000)
        debt_record.valid?
        expect(debt_record.errors[:lending_user]).to be_empty
      end
    end

    context 'when lending_user is different from expense user' do
      let(:paid_user) { create(:user) }
      let(:expense) { create(:expense, user: paid_user, payment_group:) }

      before do
        create(:management_affiliation, user: paid_user, management_group:)
        create(:payment_affiliation, user: paid_user, payment_group:)
      end

      it 'includes an error' do
        debt_record = described_class.new(lending_user: user, borrowing_user: other_user, expense:, amount_of_money: 1000)
        debt_record.valid?
        expect(debt_record.errors[:lending_user]).to include 'は支払ったユーザーと同じユーザーにしてください'
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
      ExpenseWithDebtRecordsCreator.new(
        expenses_params: [
          { user_id: user.id, amount_of_money: 1000, description: '食費', paid_on: Time.zone.today }
        ],
        payment_group:
      ).call!
    end

    context 'when the payment is completed' do
      before do
        Expense.first.debt_records.update(is_paid: true)
      end

      it 'includes an error' do
        debt_record = Expense.first.debt_records.first
        debt_record.update(amount_of_money: 1000)
        expect(debt_record.errors[:base]).to include '返済が完了しているため更新できません'
      end
    end

    context 'when the payment is not completed' do
      it 'does not include an error' do
        debt_record = Expense.first.debt_records.first
        debt_record.update(amount_of_money: 1000)
        expect(debt_record.errors[:base]).to be_empty
      end
    end
  end
end
