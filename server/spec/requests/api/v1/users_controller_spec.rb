# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :request do
  subject { get api_v1_user_path, params: { email: } }

  before { create(:user, email: 'valid-email@example.com') }

  describe '#show' do
    context 'with valid email' do
      let(:email) { 'valid-email@example.com' }

      it 'returns success response' do
        subject
        assert_response_schema_confirm(200)
      end
    end

    context 'with invalid email' do
      let(:email) { 'invalid-email' }

      it 'returns bad request response' do
        subject
        assert_response_schema_confirm(400)
      end
    end

    context 'with not found email' do
      let(:email) { 'not-found@example.com' }

      it 'returns not found response' do
        subject
        assert_response_schema_confirm(404)
      end
    end
  end
end
