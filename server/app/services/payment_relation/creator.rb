# frozen_string_literal: true

module PaymentRelation
  class Creator < Base
    def call!
      super
      ActiveRecord::Base.transaction do
        @group = @management_group.payment_groups.create!(name: @group_params[:name])
        @affiliations = group.payment_affiliations.create!(@affiliations_params)
      end

      affiliations.sort_by! { |affiliation| affiliation.user.name }
      self
    end
  end
end
