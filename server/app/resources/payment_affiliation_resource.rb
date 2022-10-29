# frozen_string_literal: true

class PaymentAffiliationResource
  include Alba::Resource

  attributes :ratio

  has_one :user, resource: UserResource
end
