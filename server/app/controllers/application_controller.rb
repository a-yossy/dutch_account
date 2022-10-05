# frozen_string_literal: true

class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include DeviseHackFakeSession

  private

  def render_authenticate_error
    # rubocop:disable Style/RedundantReturn
    return render json: {
      messages: [I18n.t('devise.failure.unauthenticated')]
    }, status: :unauthorized
    # rubocop:enable Style/RedundantReturn
  end
end
