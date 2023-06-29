# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PaymentAffiliation, type: :model do
  describe '#check_user_belongs_to_management_group' do
    let(:user) { create(:user) }
    let(:management_group) { create(:management_group) }
    let(:payment_group) { create(:payment_group, management_group:) }

    context 'when the user belongs to the management group' do
      before do
        create(:management_affiliation, user:, management_group:)
      end

      it 'does not include an error' do
        payment_affiliation = described_class.new(user:, payment_group:, ratio: 0.5)
        payment_affiliation.valid?
        expect(payment_affiliation.errors[:user]).to be_empty
      end
    end

    context 'when the user does not belong to the management group' do
      it 'includes an error' do
        payment_affiliation = described_class.new(user:, payment_group:, ratio: 0.5)
        payment_affiliation.valid?
        expect(payment_affiliation.errors[:user]).to include "は#{ManagementGroup.model_name.human}に所属していません"
      end
    end
  end
end
