# frozen_string_literal: true

module Api
  module V1
    module ManagementGroups
      module PaymentGroups
        class PaymentAffiliationsController < Api::V1::ManagementGroups::PaymentGroups::ApplicationController
          def index
            render json: PaymentAffiliationResource.new(
              @payment_group.payment_affiliations
                            .eager_load(:user)
                            .order('users.name asc')
            ).serialize
          end
        end
      end
    end
  end
end
