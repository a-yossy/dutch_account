# frozen_string_literal: true

class ManagementGroupResource
  include Alba::Resource

  attributes id: [String, true], name: String
end
