# frozen_string_literal: true

class PaymentGroupResource
  include Alba::Resource

  attributes id: [String, true], name: String
end
