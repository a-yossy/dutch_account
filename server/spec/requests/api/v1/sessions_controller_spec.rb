# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::SessionsController, type: :request do
  describe 'sign in' do
    before { create(:user, name: 'taro', email: 'email@example.com', password: 'password') }

    context 'with valid params' do
      let(:params) do
        {
          email: 'email@example.com',
          password: 'password'
        }
      end

      it 'respond with success' do
        post_as_json api_v1_sign_in_path, params
        expect(response).to have_http_status(:success)
        expect(response.has_header?('access-token')).to eq true
        expect(response.has_header?('uid')).to eq true
        expect(response.has_header?('client')).to eq true
        body = JSON.parse(response.body)
        expect(body['id']).to be_present
        expect(body['name']).to eq 'taro'
      end
    end

    context 'with invalid params' do
      let(:params) do
        {
          email: 'email@example.com',
          password: 'wrong_password'
        }
      end

      it 'respond with unauthorized' do
        post_as_json api_v1_sign_in_path, params
        expect(response).to have_http_status(:unauthorized)
        body = JSON.parse(response.body)
        expect(body['messages']).to eq [I18n.t('devise_token_auth.sessions.bad_credentials')]
      end
    end
  end

  describe 'sign out' do
    let(:user) { create(:user) }

    context 'with valid headers' do
      let(:auth_tokens) { sign_in(user) }

      it 'respond with success' do
        delete api_v1_sign_out_path, headers: auth_tokens
        expect(response).to have_http_status(:success)
      end
    end

    context 'without valid headers' do
      before { sign_in(user) }

      it 'respond with not_found' do
        delete api_v1_sign_out_path
        expect(response).to have_http_status(:not_found)
        body = JSON.parse(response.body)
        expect(body['messages']).to eq [I18n.t('devise_token_auth.sessions.user_not_found')]
      end
    end
  end
end
