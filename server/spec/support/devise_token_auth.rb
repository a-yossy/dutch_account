# frozen_string_literal: true

module DeviseTokenAuth
  def sign_in(user)
    post_as_json api_v1_sign_in_path, { email: user.email, password: user.password }
    response.headers.slice('client', 'access-token', 'uid')
  end
end

RSpec.configure do |config|
  config.include DeviseTokenAuth
end
