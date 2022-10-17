# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::CurrentUsersController, type: :request do
  describe '#show' do
    context 'when the user logs in' do
      let(:user) { create(:user) }
      let(:auth_tokens) { log_in(user) }

      it 'returns success response' do
        get api_v1_current_user_path, headers: auth_tokens
        assert_response_schema_confirm(200)
      end
    end

    context 'when the user does not log in' do
      it 'returns unauthorized response' do
        get api_v1_current_user_path
        assert_response_schema_confirm(401)
      end
    end
  end
end
