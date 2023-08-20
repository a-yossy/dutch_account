# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PaymentRelation::Base do
  describe '#call!' do
    let(:user1) { create(:user, name: 'user_1') }
    let(:user2) { create(:user, name: 'user_2') }
    let(:management_group) { create(:management_group) }
    let(:payment_relation_base) do
      described_class.new(management_group:, group_params: { name: '兄弟' }, affiliations_params:)
    end

    before do
      create(:management_affiliation, user: user1, management_group:)
      create(:management_affiliation, user: user2, management_group:)
    end

    context 'with invalid arguments that have only one user' do
      let(:affiliations_params) { [{ user_id: user1.id.to_s, ratio: 1 }] }

      it 'raises error' do
        expect do
          payment_relation_base.call!
        end.to not_change(PaymentGroup, :count)
           .and not_change(PaymentAffiliation, :count)
           .and raise_error PaymentRelation::GroupMustHaveAtLeastTwoUsersError
      end
    end

    context 'with invalid arguments whose ratio total is less than one' do
      let(:affiliations_params) { [{ user_id: user1.id.to_s, ratio: 0.5 }, { user_id: user2.id.to_s, ratio: 0.49 }] }

      it 'raises error' do
        expect do
          payment_relation_base.call!
        end.to not_change(PaymentGroup, :count)
           .and not_change(PaymentAffiliation, :count)
           .and raise_error PaymentRelation::RatioTotalNotEqualsOneError
      end
    end

    context 'with invalid arguments whose ratio total is lather than one' do
      let(:affiliations_params) { [{ user_id: user1.id.to_s, ratio: 0.5 }, { user_id: user2.id.to_s, ratio: 0.51 }] }

      it 'raises error' do
        expect do
          payment_relation_base.call!
        end.to not_change(PaymentGroup, :count)
           .and not_change(PaymentAffiliation, :count)
           .and raise_error PaymentRelation::RatioTotalNotEqualsOneError
      end
    end
  end
end
