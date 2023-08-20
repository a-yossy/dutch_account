# frozen_string_literal: true

module PaymentRelation
  class Updator < Base
    def initialize(group_params:, affiliations_params:, payment_group:)
      super(group_params:, affiliations_params:)
      @payment_group = payment_group
    end

    def call!
      super
      ActiveRecord::Base.transaction do
        @payment_group.update!(@group_params)
        @group = @payment_group

        if @payment_group.expenses.present?
          @affiliations = @payment_group.payment_affiliations
        else
          @payment_group.payment_affiliations.each(&:destroy!)
          @affiliations = @payment_group.payment_affiliations.create!(@affiliations_params)
        end
      end

      @affiliations = affiliations.sort_by { |affiliation| affiliation.user.name }
      self
    end
  end
end
