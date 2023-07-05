# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CheckValidEmail do
  describe '#call!' do
    context 'with valid email' do
      it 'does not raise error' do
        expect { described_class.new('valid-email@example.com').call! }.not_to raise_error
      end
    end

    context 'with invalid email' do
      it 'raises error' do
        expect { described_class.new('invalid-email').call! }.to raise_error InvalidEmailError
      end
    end
  end
end
