# frozen_string_literal: true

class Api::V1::SessionsController < DeviseTokenAuth::SessionsController
  protected

  def render_create_success
    data = resource_data(resource_json: @resource.token_validation_response)
    render json: {
      id: data['id'].to_s,
      name: data['name']
    }
  end

  def render_create_error_bad_credentials
    render json: {
      messages: [I18n.t('devise_token_auth.sessions.bad_credentials')]
    }, status: :unauthorized
  end

  def render_destroy_success
    render status: :no_content
  end

  def render_destroy_error
    render json: {
      messages: [I18n.t('devise_token_auth.sessions.user_not_found')]
    }, status: :not_found
  end
end
