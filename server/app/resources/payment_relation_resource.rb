# frozen_string_literal: true

class PaymentRelationResource
  include Alba::Resource

  has_one :group, resource: PaymentGroupResource
  has_many :affiliations, resource: PaymentAffiliationResource
end
