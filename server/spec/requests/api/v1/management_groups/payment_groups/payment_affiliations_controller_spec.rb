# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ManagementGroups::PaymentGroups::PaymentAffiliationsController, type: :request do
  describe '#index' do
    subject { get api_v1_management_group_payment_group_payment_affiliations_path(management_group, payment_group), headers: auth_tokens }

    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group, management_group:) }
    let(:user) { create(:user) }
    let(:auth_tokens) { log_in(user) }
    let(:other_user) { create(:user) }

    before do
      create(:management_affiliation, user:, management_group:)
      create(:management_affiliation, user: other_user, management_group:)
      create(:payment_affiliation, user:, payment_group:, ratio: 0.5)
      create(:payment_affiliation, user: other_user, payment_group:, ratio: 0.5)
    end

    it 'returns success response' do
      subject
      assert_response_schema_confirm(200)
    end
  end
end
