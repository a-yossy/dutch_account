# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ManagementGroups::PaymentGroups::PaymentAffiliationsController, type: :request do
  describe '#index' do
    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group) }

    context 'when the user logs in' do
      let(:user) { create(:user) }
      let(:auth_tokens) { log_in(user) }

      context 'when the management_group related to the user does not exit' do
        it 'returns not_found response' do
          get api_v1_management_group_payment_group_payment_affiliations_path(management_group, payment_group),
              headers: auth_tokens
          assert_response_schema_confirm(404)
        end
      end

      context 'when the management_group related to the user exists' do
        before { create(:management_affiliation, user:, management_group:) }

        context 'when the payment_group related to the management_group does not exist' do
          it 'returns not_found response' do
            get api_v1_management_group_payment_group_payment_affiliations_path(management_group, payment_group),
                headers: auth_tokens
            assert_response_schema_confirm(404)
          end
        end

        context 'when the payment_group related to the management_group exists' do
          before do
            create(:payment_affiliation, user:, payment_group:, ratio: 0.5)
            create(:payment_affiliation, user: other_user, payment_group:, ratio: 0.5)
          end

          let(:other_user) { create(:user) }
          let(:payment_group) { create(:payment_group, management_group:) }

          it 'returns success response' do
            get api_v1_management_group_payment_group_payment_affiliations_path(management_group, payment_group),
                headers: auth_tokens
            assert_response_schema_confirm(200)
          end
        end
      end
    end

    context 'when the user does not log in' do
      it 'returns unauthorized response' do
        get api_v1_management_group_payment_group_payment_affiliations_path(management_group, payment_group)
        assert_response_schema_confirm(401)
      end
    end
  end

  describe '#bulk_insert' do
    let(:management_group) { create(:management_group) }
    let(:other_user) { create(:user) }
    let(:params) { { payment_group: { name: '兄弟' }, payment_affiliations: } }

    before { create(:management_affiliation, user: other_user, management_group:) }

    context 'when the user logs in' do
      subject { post api_v1_management_group_payment_groups_bulk_insert_path(management_group), headers: auth_tokens, params: }

      let(:user) { create(:user) }
      let(:auth_tokens) { log_in(user) }

      context 'when the management_group related to the user does not exist' do
        let(:payment_affiliations) { [{ user_id: user.id.to_s, ratio: 0.5 }, { user_id: other_user.id.to_s, ratio: 0.5 }] }

        it 'returns not_found response' do
          expect { subject }.to not_change(PaymentGroup, :count).and not_change(PaymentAffiliation, :count)
          assert_response_schema_confirm(404)
        end
      end

      context 'when the management_group related to the user exists' do
        before { create(:management_affiliation, user:, management_group:) }

        context 'with invalid params that have ratios less than zero or lather than one' do
          let(:payment_affiliations) { [{ user_id: user.id.to_s, ratio: -1 }, { user_id: other_user.id.to_s, ratio: 2 }] }

          it 'returns bad_request response' do
            expect { subject }.to not_change(PaymentGroup, :count).and not_change(PaymentAffiliation, :count)
            assert_response_schema_confirm(400)
          end
        end

        context 'with invalid params that have only one user' do
          let(:payment_affiliations) { [{ user_id: user.id.to_s, ratio: 1 }] }

          it 'returns bad_request response' do
            expect { subject }.to not_change(PaymentGroup, :count).and not_change(PaymentAffiliation, :count)
            assert_response_schema_confirm(400)
          end
        end

        context 'with invalid params whose user does not belong to the management group' do
          let(:wrong_user) { create(:user) }
          let(:payment_affiliations) { [{ user_id: user.id.to_s, ratio: 0.5 }, { user_id: wrong_user.id.to_s, ratio: 0.5 }] }

          it 'returns bad_request response' do
            expect { subject }.to not_change(PaymentGroup, :count).and not_change(PaymentAffiliation, :count)
            assert_response_schema_confirm(400)
          end
        end

        context 'with invalid arguments whose ratio total is not one' do
          let(:payment_affiliations) { [{ user_id: user.id.to_s, ratio: 0.5 }, { user_id: other_user.id.to_s, ratio: 0.6 }] }

          it 'returns bad_request response' do
            expect { subject }.to not_change(PaymentGroup, :count).and not_change(PaymentAffiliation, :count)
            assert_response_schema_confirm(400)
          end
        end

        context 'with valid params' do
          let(:payment_affiliations) { [{ user_id: user.id.to_s, ratio: 0.5 }, { user_id: other_user.id.to_s, ratio: 0.5 }] }

          it 'returns success response' do
            expect { subject }.to change(PaymentGroup, :count).by(1).and change(PaymentAffiliation, :count).by(2)
            assert_response_schema_confirm(201)
          end
        end
      end
    end

    context 'when the user does not log in' do
      it 'returns unauthorized response' do
        post api_v1_management_group_payment_groups_bulk_insert_path(management_group)
        assert_response_schema_confirm(401)
      end
    end
  end
end
