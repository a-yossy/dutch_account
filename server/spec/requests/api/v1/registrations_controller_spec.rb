# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::RegistrationsController, type: :request do
  describe '#create' do
    subject { post_as_json api_v1_sign_up_path, params }

    context 'with valid params' do
      let(:params) do
        {
          name: 'taro',
          email: 'email@example.com',
          password: 'password'
        }
      end

      it 'returns success response' do
        expect { subject }.to change(User, :count).by(1)
        assert_response_schema_confirm(200)
      end
    end

    context 'with invalid params' do
      let(:params) do
        {
          name: 'taro',
          email: '',
          password: 'password'
        }
      end

      it 'returns unprocessable_entity response' do
        expect { subject }.not_to change(User, :count)
        assert_response_schema_confirm(422)
      end
    end
  end
end
