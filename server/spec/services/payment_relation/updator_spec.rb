# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PaymentRelation::Updator do
  describe '#call!' do
    let(:user1) { create(:user) }
    let(:user2) { create(:user) }
    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group, name: '姉妹', management_group:) }
    let(:payment_relation_updator) do
      described_class.new(payment_group:, group_params: { name: '兄弟' }, affiliations_params:)
    end

    before do
      create(:management_affiliation, user: user1, management_group:)
      create(:management_affiliation, user: user2, management_group:)
      create(:payment_affiliation, user: user1, payment_group:, ratio: 0.5)
      create(:payment_affiliation, user: user2, payment_group:, ratio: 0.5)
    end

    context 'when payment_group does not have expenses with valid arguments' do
      let(:affiliations_params) { [{ user_id: user2.id.to_s, ratio: 0.7 }, { user_id: user1.id.to_s, ratio: 0.3 }] }

      it 'updates payment_group and payment_affiliations' do
        expect do
          payment_relation_updator.call!
        end.to change { PaymentGroup.first.name }.from('姉妹').to('兄弟')
        expect(PaymentAffiliation.find_by(user_id: user2.id).ratio).to eq(0.7)
        expect(PaymentAffiliation.find_by(user_id: user1.id).ratio).to eq(0.3)
      end

      it 'returns payement_relation_updator instance that have group and affiliations' do
        payment_relation = payment_relation_updator.call!
        expect(payment_relation.instance_of?(described_class)).to eq(true)
        expect(payment_relation.group).to eq(PaymentGroup.first)
        expect(payment_relation.affiliations).to eq([PaymentAffiliation.second, PaymentAffiliation.first])
      end
    end

    context 'when payment_group has expenses with valid arguments' do
      let(:affiliations_params) { [{ user_id: user2.id.to_s, ratio: 0.7 }, { user_id: user1.id.to_s, ratio: 0.3 }] }

      before do
        ExpensesWithDebtRecordsCreator.new(
          expenses_params: [
            { user_id: user1.id, amount_of_money: 1000, description: '食費', paid_on: Time.zone.today }
          ],
          payment_group:
        ).call!
      end

      it 'updates payment_group and do not update payment_affiliations' do
        expect do
          payment_relation_updator.call!
        end.to change { PaymentGroup.first.name }.from('姉妹').to('兄弟')
                                                 .and(not_change { PaymentAffiliation.find_by(user_id: user2.id).ratio })
                                                 .and(not_change { PaymentAffiliation.find_by(user_id: user1.id).ratio })
      end
    end

    context 'with invalid arguments that have ratios less than zero or lather than one' do
      let(:affiliations_params) { [{ user_id: user1.id.to_s, ratio: -1 }, { user_id: user2.id.to_s, ratio: 2 }] }

      it 'raises error' do
        expect do
          payment_relation_updator.call!
        end.to not_change { PaymentGroup.first.name }
          .and raise_error ActiveRecord::RecordInvalid
      end
    end
  end
end
