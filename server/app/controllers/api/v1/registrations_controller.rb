# frozen_string_literal: true

class Api::V1::RegistrationsController < DeviseTokenAuth::RegistrationsController
  wrap_parameters false

  def sign_up_params
    params.permit(%i[name email password password_confirmation])
  end
end
