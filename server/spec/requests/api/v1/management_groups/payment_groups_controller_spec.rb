# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ManagementGroups::PaymentGroupsController, type: :request do
  describe 'index' do
    subject { get api_v1_management_group_payment_groups_path(management_group), headers: auth_tokens }

    let(:management_group) { create(:management_group) }

    context 'when the user logs in' do
      let(:user) { create(:user) }
      let(:auth_tokens) { log_in(user) }

      context 'when the management_group related to the user does not exist' do
        it 'returns not_found response' do
          subject
          assert_response_schema_confirm(404)
        end
      end

      context 'when the management_group related to the user exists' do
        before do
          create(:management_affiliation, user:, management_group:)
          create(:payment_group, management_group:)
        end

        it 'returns success response' do
          subject
          assert_response_schema_confirm(200)
        end
      end
    end

    context 'when the user does not log in' do
      let(:auth_tokens) { nil }

      it 'returns unauthorized response' do
        subject
        assert_response_schema_confirm(401)
      end
    end
  end

  describe '#show' do
    subject { get api_v1_management_group_payment_group_path(management_group, payment_group), headers: auth_tokens }

    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group) }
    let(:user) { create(:user) }
    let(:auth_tokens) { log_in(user) }

    before { create(:management_affiliation, user:, management_group:) }

    context 'when the payment_group related to the management_group does not exist' do
      it 'returns not_found response' do
        subject
        assert_response_schema_confirm(404)
      end
    end

    context 'when the payment_group related to the management_group exists' do
      let(:payment_group) { create(:payment_group, management_group:) }
      let(:other_user) { create(:user) }

      before do
        create(:management_affiliation, user: other_user, management_group:)
        create(:payment_affiliation, user:, payment_group:)
        create(:payment_affiliation, user: other_user, payment_group:)
      end

      it 'returns success response' do
        subject
        assert_response_schema_confirm(200)
      end
    end
  end

  describe '#destroy' do
    subject { delete api_v1_management_group_payment_group_path(management_group, payment_group), headers: auth_tokens }

    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group, management_group:) }
    let(:user) { create(:user) }
    let(:auth_tokens) { log_in(user) }
    let(:other_user) { create(:user) }

    before do
      create(:management_affiliation, user:, management_group:)
      create(:management_affiliation, user: other_user, management_group:)
      create(:payment_affiliation, user:, payment_group:)
      create(:payment_affiliation, user: other_user, payment_group:)
    end

    context 'when the payment_group has expenses' do
      before do
        ExpensesWithDebtRecordsCreator.new(
          expenses_params: [
            { user_id: user.id, amount_of_money: 1000, description: '食費', paid_on: Time.zone.today }
          ],
          payment_group:
        ).call!
      end

      it 'returns bad_request response' do
        expect { subject }.to not_change(PaymentGroup, :count)
        assert_response_schema_confirm(400)
      end
    end

    context 'when the payment_group has no expenses' do
      it 'returns no_content response' do
        expect { subject }.to change(PaymentGroup, :count).by(-1).and change(PaymentAffiliation, :count).by(-2)
        assert_response_schema_confirm(204)
      end
    end
  end
end
