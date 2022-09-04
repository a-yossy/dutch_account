# frozen_string_literal: true

class Api::V1::RegistrationsController < DeviseTokenAuth::RegistrationsController
  before_action :configure_permitted_parameters

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name])
  end
end
