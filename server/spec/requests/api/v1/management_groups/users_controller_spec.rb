# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ManagementGroups::UsersController, type: :request do
  describe '#index' do
    subject { get api_v1_management_group_users_path(management_group), headers: auth_tokens }

    let(:management_group) { create(:management_group) }
    let(:user) { create(:user) }
    let(:auth_tokens) { log_in(user) }
    let(:other_user) { create(:user) }

    before do
      create(:management_affiliation, user:, management_group:)
      create(:management_affiliation, user: other_user, management_group:)
    end

    it 'returns success response' do
      subject
      assert_response_schema_confirm(200)
    end
  end
end
