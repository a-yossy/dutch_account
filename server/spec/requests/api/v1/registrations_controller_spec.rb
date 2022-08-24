# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::RegistrationsController, type: :request do
  describe 'sign up' do
    context 'with valid params' do
      let(:params) do
        {
          name: 'admin',
          email: 'admin@example.com',
          password: 'password'
        }
      end

      it 'respond with success' do
        expect { post api_v1_sign_up_path, params: }.to change(Admin, :count).by(1)
        expect(response).to have_http_status(:success)
      end
    end

    context 'with invalid params' do
      let(:params) do
        {
          name: 'admin',
          email: '',
          password: 'password'
        }
      end

      it 'respond with unprocessable_entity' do
        expect { post api_v1_sign_up_path, params: }.not_to change(Admin, :count)
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
