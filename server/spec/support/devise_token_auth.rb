# frozen_string_literal: true

module DeviseTokenAuth
  def log_in(user)
    post_as_json api_v1_log_in_path, { email: user.email, password: user.password }
    response.headers.slice('client', 'access-token', 'uid')
  end
end

RSpec.configure do |config|
  config.include DeviseTokenAuth
end
