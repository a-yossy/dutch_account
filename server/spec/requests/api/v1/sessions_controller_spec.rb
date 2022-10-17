# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::SessionsController, type: :request do
  describe '#create' do
    subject { post_as_json api_v1_log_in_path, params }

    before { create(:user, email: 'email@example.com', password: 'password') }

    context 'with valid params' do
      let(:params) do
        {
          email: 'email@example.com',
          password: 'password'
        }
      end

      it 'responds with success' do
        subject
        assert_response_schema_confirm(200)
      end
    end

    context 'with invalid params' do
      let(:params) do
        {
          email: 'email@example.com',
          password: 'wrong_password'
        }
      end

      it 'responds with unauthorized' do
        subject
        assert_response_schema_confirm(401)
      end
    end
  end

  describe '#destroy' do
    subject { delete api_v1_log_out_path, headers: auth_tokens }

    let(:user) { create(:user) }

    context 'with valid headers' do
      let(:auth_tokens) { log_in(user) }

      it 'responds with success' do
        subject
        assert_response_schema_confirm(204)
      end
    end

    context 'with invalid headers' do
      let(:auth_tokens) { log_in(user).slice('access-token', 'uid') }

      it 'responds with not_found' do
        subject
        assert_response_schema_confirm(404)
      end
    end
  end
end
