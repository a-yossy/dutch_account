# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ManagementGroups::PaymentRelationsController, type: :request do
  describe '#bulk_insert' do
    subject { post bulk_insert_api_v1_management_group_payment_relations_path(management_group), headers: auth_tokens, params: }

    let(:management_group) { create(:management_group) }
    let(:other_user) { create(:user) }
    let(:params) { { group: { name: '兄弟' }, affiliations: } }
    let(:affiliations) { [] }

    before { create(:management_affiliation, user: other_user, management_group:) }

    context 'when the user logs in' do
      let(:user) { create(:user) }
      let(:auth_tokens) { log_in(user) }

      context 'when the management_group related to the user does not exist' do
        it 'returns not_found response' do
          expect { subject }.to not_change(PaymentGroup, :count).and not_change(PaymentAffiliation, :count)
          assert_response_schema_confirm(404)
        end
      end

      context 'when the management_group related to the user exists' do
        before { create(:management_affiliation, user:, management_group:) }

        context 'with invalid params that have ratios less than zero or lather than one' do
          let(:affiliations) { [{ user_id: user.id.to_s, ratio: -1 }, { user_id: other_user.id.to_s, ratio: 2 }] }

          it 'returns bad_request response' do
            expect { subject }.to not_change(PaymentGroup, :count).and not_change(PaymentAffiliation, :count)
            assert_response_schema_confirm(400)
          end
        end

        context 'with invalid params that have only one user' do
          let(:affiliations) { [{ user_id: user.id.to_s, ratio: 1 }] }

          it 'returns bad_request response' do
            expect { subject }.to not_change(PaymentGroup, :count).and not_change(PaymentAffiliation, :count)
            assert_response_schema_confirm(400)
          end
        end

        context 'with invalid arguments whose ratio total is not one' do
          let(:affiliations) { [{ user_id: user.id.to_s, ratio: 0.5 }, { user_id: other_user.id.to_s, ratio: 0.6 }] }

          it 'returns bad_request response' do
            expect { subject }.to not_change(PaymentGroup, :count).and not_change(PaymentAffiliation, :count)
            assert_response_schema_confirm(400)
          end
        end

        context 'with valid params' do
          let(:affiliations) { [{ user_id: user.id.to_s, ratio: 0.5 }, { user_id: other_user.id.to_s, ratio: 0.5 }] }

          it 'returns success response' do
            expect { subject }.to change(PaymentGroup, :count).by(1).and change(PaymentAffiliation, :count).by(2)
            assert_response_schema_confirm(201)
          end
        end
      end
    end

    context 'when the user does not log in' do
      let(:auth_tokens) { nil }

      it 'returns unauthorized response' do
        expect { subject }.to not_change(PaymentGroup, :count).and not_change(PaymentAffiliation, :count)
        assert_response_schema_confirm(401)
      end
    end
  end
end
