# frozen_string_literal: true

class PaymentAffiliationResource
  include Alba::Resource

  attribute :ratio do |resource|
    resource.ratio.to_f
  end

  has_one :user, resource: UserResource
end
