# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::SignInUsersController, type: :request do
  describe '#show' do
    context 'when the user signs in' do
      let(:user) { create(:user) }
      let(:auth_tokens) { sign_in(user) }

      it 'returns success response' do
        get api_v1_sign_in_user_path, headers: auth_tokens
        assert_response_schema_confirm(200)
      end
    end

    context 'when the user does not sign in' do
      it 'returns unauthorized response' do
        get api_v1_sign_in_user_path
        assert_response_schema_confirm(401)
      end
    end
  end
end
