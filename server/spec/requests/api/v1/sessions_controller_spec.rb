# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::SessionsController, type: :request do
  describe '#create' do
    subject { post_as_json api_v1_sign_in_path, params }

    let!(:user) { create(:user, name: 'taro', email: 'email@example.com', password: 'password') }

    context 'with valid params' do
      let(:params) do
        {
          email: 'email@example.com',
          password: 'password'
        }
      end

      it 'responds with success' do
        subject
        expect(response).to have_http_status :success
        expect(response.has_header?('access-token')).to eq true
        expect(response.has_header?('uid')).to eq true
        expect(response.has_header?('client')).to eq true
        body = JSON.parse(response.body)
        expect(body['id']).to eq user.id
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

      it 'responds with unauthorized' do
        subject
        expect(response).to have_http_status :unauthorized
        body = JSON.parse(response.body)
        expect(body['messages']).to eq [I18n.t('devise_token_auth.sessions.bad_credentials')]
      end
    end
  end

  describe '#destroy' do
    subject { delete api_v1_sign_out_path, headers: auth_tokens }

    let(:user) { create(:user) }

    context 'with valid headers' do
      let(:auth_tokens) { sign_in(user) }

      it 'responds with success' do
        subject
        expect(response).to have_http_status :success
      end
    end

    context 'with invalid headers' do
      let(:auth_tokens) { sign_in(user).slice('access-token', 'uid') }

      it 'responds with not_found' do
        subject
        expect(response).to have_http_status :not_found
        body = JSON.parse(response.body)
        expect(body['messages']).to eq [I18n.t('devise_token_auth.sessions.user_not_found')]
      end
    end
  end
end
