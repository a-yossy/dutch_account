# frozen_string_literal: true

module ApiMacros
  def post_as_json(path, parameters = nil, headers_or_env = {})
    post path, params: parameters.to_json,
               headers: headers_or_env.merge('content-type': 'application/json', accept: 'application/json')
  end
end

RSpec.configure do |config|
  config.include ApiMacros
end
