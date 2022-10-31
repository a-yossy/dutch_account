# frozen_string_literal: true

class PaymentGroupAffiliationsCreator
  attr_accessor :payment_group, :payment_affiliations

  def initialize(management_group:, payment_group_params:, payment_affiliations_params:)
    @management_group = management_group
    @payment_group_params = payment_group_params
    @payment_affiliations_params = payment_affiliations_params
  end

  def call
    check_ratio_total_equals_one!

    ActiveRecord::Base.transaction do
      self.payment_group = @management_group.payment_groups.create!(name: @payment_group_params[:name])
      self.payment_affiliations = @payment_affiliations_params.map do |payment_affilition_params|
        payment_group.payment_affiliations.create!(
          user_id: payment_affilition_params[:user_id],
          ratio: payment_affilition_params[:ratio]
        )
      end
    end

    self
  end

  private

  def check_ratio_total_equals_one!
    if @payment_affiliations_params.sum { |payment_affiliation| payment_affiliation[:ratio].to_d } != 1.0.to_d
      raise RatioTotalNotEqualsOneError, "#{PaymentAffiliation.human_attribute_name('ratio')}の合計が1になるよう入力してください"
    end
  end
end
