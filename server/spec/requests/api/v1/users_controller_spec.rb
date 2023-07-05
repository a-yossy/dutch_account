# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :request do
  before { create(:user, email: 'valid-email@example.com') }

  describe '#show' do
    context 'with valid email' do
      it 'returns success response' do
        get api_v1_user_path, params: { email: 'valid-email@example.com' }
        assert_response_schema_confirm(200)
      end
    end

    context 'with invalid email' do
      it 'returns bad request response' do
        get api_v1_user_path, params: { email: 'invalid-email' }
        assert_response_schema_confirm(400)
      end
    end

    context 'with not found email' do
      it 'returns not found response' do
        get api_v1_user_path, params: { email: 'not-found@example.com' }
        assert_response_schema_confirm(404)
      end
    end
  end
end
