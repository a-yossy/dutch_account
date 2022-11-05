# frozen_string_literal: true

class PaymentRelationCreator
  attr_reader :payment_group, :payment_affiliations

  def initialize(management_group:, payment_group_params:, payment_affiliations_params:)
    @management_group = management_group
    @payment_group_params = payment_group_params
    @payment_affiliations_params = payment_affiliations_params
  end

  def call!
    check_exist_at_least_two_users!
    check_users_belong_to_management_group!
    check_ratio_total_equals_one!

    ActiveRecord::Base.transaction do
      @payment_group = @management_group.payment_groups.create!(name: @payment_group_params[:name])
      @payment_affiliations = @payment_affiliations_params.map do |payment_affilition_params|
        payment_group.payment_affiliations.create!(
          user_id: payment_affilition_params[:user_id],
          ratio: payment_affilition_params[:ratio]
        )
      end
    end

    self
  end

  private

  def check_exist_at_least_two_users!
    return if @payment_affiliations_params.size != 1

    raise PaymentRelation::PaymentGroupMustHaveAtLeastTwoUsersError,
          "#{PaymentAffiliation.human_attribute_name('user')}は2人以上入力してください"
  end

  def check_users_belong_to_management_group!
    return if @payment_affiliations_params.all? { |params| @management_group.user_ids.map(&:to_s).include?(params[:user_id]) }

    raise PaymentRelation::NotBelongingToManagementGroupError,
          "#{PaymentGroup.human_attribute_name('management_group')}に所属している#{PaymentAffiliation.human_attribute_name('user')}を入力してください"
  end

  def check_ratio_total_equals_one!
    return if @payment_affiliations_params.sum { |params| params[:ratio].to_d } == 1.0.to_d

    raise PaymentRelation::RatioTotalNotEqualsOneError,
          "#{PaymentAffiliation.human_attribute_name('ratio')}の合計が1になるよう入力してください"
  end
end
