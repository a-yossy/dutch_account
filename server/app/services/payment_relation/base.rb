# frozen_string_literal: true

module PaymentRelation
  class Base
    attr_reader :group, :affiliations

    def initialize(group_params:, affiliations_params:)
      @group_params = group_params
      @affiliations_params = affiliations_params
    end

    def call!
      check_exist_at_least_two_users!
      check_ratio_total_equals_one!
    end

    private

    def check_exist_at_least_two_users!
      return if @affiliations_params.size >= 2

      raise PaymentRelation::GroupMustHaveAtLeastTwoUsersError,
            "#{PaymentAffiliation.human_attribute_name('user')}は2人以上入力してください"
    end

    def check_ratio_total_equals_one!
      return if @affiliations_params.sum { |params| params[:ratio].to_d } == 1.0.to_d

      raise PaymentRelation::RatioTotalNotEqualsOneError,
            "#{PaymentAffiliation.human_attribute_name('ratio')}の合計が1になるよう入力してください"
    end
  end
end
