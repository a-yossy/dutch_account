# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ManagementGroups::PaymentGroups::PaymentRelationsController, type: :request do
  describe '#bulk_update' do
    subject do
      patch bulk_update_api_v1_management_group_payment_group_payment_relations_path(management_group, payment_group), headers: auth_tokens,
                                                                                                                       params:
    end

    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group, management_group:, name: '姉妹') }
    let(:user) { create(:user) }
    let(:auth_tokens) { log_in(user) }
    let(:other_user) { create(:user) }
    let(:params) { { group: { name: '兄弟' }, affiliations: } }
    let(:user_payment_affiliation) { create(:payment_affiliation, user:, payment_group:, ratio: 0.5) }
    let(:other_user_payment_affiliation) { create(:payment_affiliation, user: other_user, payment_group:, ratio: 0.5) }

    before do
      create(:management_affiliation, user:, management_group:)
      create(:management_affiliation, user: other_user, management_group:)
      user_payment_affiliation
      other_user_payment_affiliation
    end

    context 'with invalid params that have ratios less than zero or lather than one' do
      let(:affiliations) { [{ user_id: user.id.to_s, ratio: -1 }, { user_id: other_user.id.to_s, ratio: 2 }] }

      it 'returns bad_request response' do
        expect do
          subject
        end.to not_change(payment_group, :name)
           .and not_change(user_payment_affiliation, :ratio)
           .and not_change(other_user_payment_affiliation, :ratio)
        assert_response_schema_confirm(400)
      end
    end

    context 'with invalid params that have only one user' do
      let(:affiliations) { [{ user_id: user.id.to_s, ratio: 1 }] }

      it 'returns bad_request response' do
        expect do
          subject
        end.to not_change(payment_group, :name)
           .and not_change(user_payment_affiliation, :ratio)
           .and not_change(other_user_payment_affiliation, :ratio)
        assert_response_schema_confirm(400)
      end
    end

    context 'with invalid arguments whose ratio total is not one' do
      let(:affiliations) { [{ user_id: user.id.to_s, ratio: 0.5 }, { user_id: other_user.id.to_s, ratio: 0.6 }] }

      it 'returns bad_request response' do
        expect do
          subject
        end.to not_change(payment_group, :name)
           .and not_change(user_payment_affiliation, :ratio)
           .and not_change(other_user_payment_affiliation, :ratio)
        assert_response_schema_confirm(400)
      end
    end

    context 'when the payment_group does not have expenses with valid params' do
      let(:affiliations) { [{ user_id: user.id.to_s, ratio: 0.7 }, { user_id: other_user.id.to_s, ratio: 0.3 }] }

      it 'returns success response' do
        expect { subject }.to change { payment_group.reload.name }.from('姉妹').to('兄弟')
        expect(PaymentAffiliation.find_by(user:, payment_group:).ratio).to eq(0.7)
        expect(PaymentAffiliation.find_by(user: other_user, payment_group:).ratio).to eq(0.3)
        assert_response_schema_confirm(200)
      end
    end

    context 'when the payment_group has expenses with valid params' do
      let(:affiliations) { [{ user_id: user.id.to_s, ratio: 0.7 }, { user_id: other_user.id.to_s, ratio: 0.3 }] }

      before do
        ExpensesWithDebtRecordsCreator.new(
          expenses_params: [
            { user_id: user.id, amount_of_money: 1000, description: '食費', paid_on: Time.zone.today }
          ],
          payment_group:
        ).call!
      end

      it 'returns success response' do
        expect { subject }.to change { payment_group.reload.name }.from('姉妹').to('兄弟')
                          .and not_change(user_payment_affiliation, :ratio)
                          .and not_change(other_user_payment_affiliation, :ratio)
        assert_response_schema_confirm(200)
      end
    end
  end
end
