# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PaymentRelation::Creator do
  describe '#call!' do
    let(:user1) { create(:user, name: 'user_1') }
    let(:user2) { create(:user, name: 'user_2') }
    let(:management_group) { create(:management_group) }
    let(:payment_relation_creator) do
      described_class.new(management_group:, group_params: { name: '兄弟' }, affiliations_params:)
    end

    before do
      create(:management_affiliation, user: user1, management_group:)
      create(:management_affiliation, user: user2, management_group:)
    end

    context 'with valid arguments' do
      let(:affiliations_params) { [{ user_id: user2.id.to_s, ratio: 0.5 }, { user_id: user1.id.to_s, ratio: 0.5 }] }

      it 'creates one payment_group and two payment_affiliations' do
        expect do
          payment_relation_creator.call!
        end.to change(PaymentGroup, :count).by(1).and change(PaymentAffiliation, :count).by(2)
      end

      it 'returns payement_relation_creator instance that have group and affiliations' do
        payment_relation = payment_relation_creator.call!
        expect(payment_relation.instance_of?(described_class)).to eq(true)
        expect(payment_relation.group).to eq(PaymentGroup.first)
        expect(payment_relation.affiliations).to eq([PaymentAffiliation.second, PaymentAffiliation.first])
      end
    end

    context 'with invalid arguments that have ratios less than zero or lather than one' do
      let(:affiliations_params) { [{ user_id: user1.id.to_s, ratio: -1 }, { user_id: user2.id.to_s, ratio: 2 }] }

      it 'raises error' do
        expect do
          payment_relation_creator.call!
        end.to not_change(PaymentGroup, :count)
           .and not_change(PaymentAffiliation, :count)
           .and raise_error ActiveRecord::RecordInvalid
      end
    end
  end
end
