# frozen_string_literal: true

class UserResource
  include Alba::Resource

  attributes id: [String, true], name: String
end
