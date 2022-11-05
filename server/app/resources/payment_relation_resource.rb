# frozen_string_literal: true

class PaymentRelationResource
  include Alba::Resource

  has_one :payment_group, resource: PaymentGroupResource
  has_many :payment_affiliations, resource: PaymentAffiliationResource
end
