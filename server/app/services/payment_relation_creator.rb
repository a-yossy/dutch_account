# frozen_string_literal: true

class PaymentRelationCreator
  attr_reader :group, :affiliations

  def initialize(management_group:, group_params:, affiliations_params:)
    @management_group = management_group
    @group_params = group_params
    @affiliations_params = affiliations_params
  end

  def call!
    check_exist_at_least_two_users!
    check_users_belong_to_management_group!
    check_ratio_total_equals_one!

    ActiveRecord::Base.transaction do
      @group = @management_group.payment_groups.create!(name: @group_params[:name])
      @affiliations = group.payment_affiliations.create!(@affiliations_params)
    end

    affiliations.sort_by! { |affiliation| affiliation.user.name }
    self
  end

  private

  def check_exist_at_least_two_users!
    return if @affiliations_params.size >= 2

    raise PaymentRelation::GroupMustHaveAtLeastTwoUsersError,
          "#{PaymentAffiliation.human_attribute_name('user')}は2人以上入力してください"
  end

  def check_users_belong_to_management_group!
    return if @affiliations_params.pluck(:user_id).map(&:to_s).to_set.subset?(@management_group.user_ids.map(&:to_s).to_set)

    raise PaymentRelation::NotBelongingToManagementGroupError,
          "#{ManagementGroup.model_name.human}に所属している#{PaymentAffiliation.human_attribute_name('user')}を入力してください"
  end

  def check_ratio_total_equals_one!
    return if @affiliations_params.sum { |params| params[:ratio].to_d } == 1.0.to_d

    raise PaymentRelation::RatioTotalNotEqualsOneError,
          "#{PaymentAffiliation.human_attribute_name('ratio')}の合計が1になるよう入力してください"
  end
end
