# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::RegistrationsController, type: :request do
  describe 'sign up' do
    context 'with valid params' do
      let(:params) do
        {
          name: 'taro',
          email: 'email@example.com',
          password: 'password',
          password_confirmation: 'password'
        }.to_json
      end

      it 'respond with success' do
        expect do
          post api_v1_sign_up_path, params:,
                                    headers: { 'content-type': 'application/json', accept: 'application/json' }
        end.to change(User, :count).by(1)
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
          name: 'taro',
          email: '',
          password: 'password',
          password_confirmation: 'password'
        }.to_json
      end

      it 'respond with unprocessable_entity' do
        expect do
          post api_v1_sign_up_path, params:,
                                    headers: { 'content-type': 'application/json', accept: 'application/json' }
        end.not_to change(User, :count)
        expect(response).to have_http_status(:unprocessable_entity)
        body = JSON.parse(response.body)
        expect(body['messages']).to eq [
          I18n.t(
            'errors.format',
            attribute: User.human_attribute_name(:email),
            message: I18n.t('errors.messages.blank')
          )
        ]
      end
    end
  end
end
