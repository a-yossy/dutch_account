# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ManagementGroups::PaymentGroupsController, type: :request do
  describe 'index' do
    let(:management_group) { create(:management_group) }

    context 'when the user logs in' do
      let(:user) { create(:user) }
      let(:auth_tokens) { log_in(user) }

      context 'when the management group related to the user does not exist' do
        it 'returns not_found response' do
          get api_v1_management_group_payment_groups_path(management_group), headers: auth_tokens
          assert_response_schema_confirm(404)
        end
      end

      context 'when the management group related to the user exists' do
        before do
          create(:management_affiliation, user:, management_group:)
          create(:payment_group, management_group:)
        end

        it 'returns success response' do
          get api_v1_management_group_payment_groups_path(management_group), headers: auth_tokens
          assert_response_schema_confirm(200)
        end
      end
    end

    context 'when the user does not log in' do
      it 'returns unauthorized response' do
        get api_v1_management_group_payment_groups_path(management_group)
        assert_response_schema_confirm(401)
      end
    end
  end

  describe '#show' do
    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group) }

    context 'when the user logs in' do
      let(:user) { create(:user) }
      let(:auth_tokens) { log_in(user) }

      context 'when the management group related to the user does not exist' do
        it 'returns not_found response' do
          get api_v1_management_group_payment_group_path(management_group, payment_group), headers: auth_tokens
          assert_response_schema_confirm(404)
        end
      end

      context 'when the management group related to the user exists' do
        before { create(:management_affiliation, user:, management_group:) }

        context 'when the payment group related to the management group does not exist' do
          it 'returns not_found response' do
            get api_v1_management_group_payment_group_path(management_group, payment_group), headers: auth_tokens
            assert_response_schema_confirm(404)
          end
        end

        context 'when the payment group related to the management group exists' do
          let(:payment_group) { create(:payment_group, management_group:) }

          it 'returns success response' do
            get api_v1_management_group_payment_group_path(management_group, payment_group), headers: auth_tokens
            assert_response_schema_confirm(200)
          end
        end
      end
    end

    context 'when the user does not log in' do
      it 'returns unauthorized response' do
        get api_v1_management_group_payment_group_path(management_group, payment_group)
        assert_response_schema_confirm(401)
      end
    end
  end
end
