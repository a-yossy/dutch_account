# frozen_string_literal: true

module DeviseTokenAuth
  def sign_in(admin)
    post api_v1_sign_in_path, params: { email: admin.email, password: admin.password }.to_json,
                              headers: { 'content-type': 'application/json', accept: 'application/json' }
    response.headers.slice('client', 'access-token', 'uid')
  end
end

RSpec.configure do |config|
  config.include DeviseTokenAuth
end
