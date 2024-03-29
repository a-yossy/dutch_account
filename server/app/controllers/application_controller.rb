# frozen_string_literal: true

class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include DeviseHackFakeSession
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_error

  private

  def render_not_found_error
    render json: {
      messages: [I18n.t('errors.messages.not_found')]
    }, status: :not_found
  end

  def render_authenticate_error
    # rubocop:disable Style/RedundantReturn
    return render json: {
      messages: [I18n.t('devise.failure.unauthenticated')]
    }, status: :unauthorized
    # rubocop:enable Style/RedundantReturn
  end

  def render_bad_request_error(error)
    render json: {
      messages: error.message.split(', ')
    }, status: :bad_request
  end

  def render_unprocessable_entity_error(error)
    render json: {
      messages: error.message.split(', ')
    }, status: :unprocessable_entity
  end
end
