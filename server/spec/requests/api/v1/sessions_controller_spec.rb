# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::SessionsController, type: :request do
  describe 'sign in' do
    before { create(:admin, email: 'admin@example.com', password: 'password') }

    context 'with valid params' do
      let(:params) do
        {
          email: 'admin@example.com',
          password: 'password'
        }.to_json
      end

      it 'respond with success' do
        post api_v1_sign_in_path, params: params,
                                  headers: { 'content-type': 'application/json', accept: 'application/json' }
        expect(response).to have_http_status(:success)
        expect(response.has_header?('access-token')).to eq true
        expect(response.has_header?('expiry')).to eq true
        expect(response.has_header?('token-type')).to eq true
        expect(response.has_header?('uid')).to eq true
        expect(response.has_header?('client')).to eq true
      end
    end

    context 'with invalid params' do
      let(:params) do
        {
          email: 'admin@example.com',
          password: 'wrong_password'
        }.to_json
      end

      it 'respond with unauthorized' do
        post api_v1_sign_in_path, params: params,
                                  headers: { 'content-type': 'application/json', accept: 'application/json' }
        expect(response).to have_http_status(:unauthorized)
        expect(response.has_header?('access-token')).to eq false
        expect(response.has_header?('expiry')).to eq false
        expect(response.has_header?('token-type')).to eq false
        expect(response.has_header?('uid')).to eq false
        expect(response.has_header?('client')).to eq false
      end
    end
  end

  describe 'sign out' do
    context 'with valid headers' do
      let(:admin) { create(:admin) }
      let(:auth_tokens) { sign_in(admin) }

      it 'respond with success' do
        delete api_v1_sign_out_path, headers: auth_tokens
        expect(response).to have_http_status(:success)
      end
    end

    context 'without valid headers' do
      it 'respond with not_found' do
        delete api_v1_sign_out_path
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
