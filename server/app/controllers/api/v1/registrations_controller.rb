# frozen_string_literal: true

class Api::V1::RegistrationsController < DeviseTokenAuth::RegistrationsController
  before_action :configure_permitted_parameters

  protected

  def render_create_success
    data = resource_data
    render json: {
      id: data['id'],
      name: data['name']
    }
  end

  def render_create_error
    render json: {
      messages: resource_errors[:full_messages]
    }, status: :unprocessable_entity
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name])
  end
end
