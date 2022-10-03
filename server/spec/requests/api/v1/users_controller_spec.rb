# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :request do
  describe '#show' do
    let(:user) { create(:user, id: 1) }

    context 'with sign_in' do
      let(:auth_tokens) { sign_in(user) }

      context 'with valid request' do
        it 'response with success' do
          get api_v1_user_path(user), headers: auth_tokens
          assert_response_schema_confirm(200)
        end
      end

      context 'with other user request' do
        let(:other_user) { create(:user) }

        it 'respond with forbidden' do
          get api_v1_user_path(other_user), headers: auth_tokens
          assert_response_schema_confirm(403)
        end
      end

      context 'with non-existent user request' do
        it 'respond with not_found' do
          get api_v1_user_path(2), headers: auth_tokens
          assert_response_schema_confirm(404)
        end
      end
    end

    context 'without sign_in' do
      it 'response with unauthorized' do
        get api_v1_user_path(user)
        assert_response_schema_confirm(401)
      end
    end
  end
end
