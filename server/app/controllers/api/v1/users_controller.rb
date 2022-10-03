# frozen_string_literal: true

class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!

  def show
    user = User.find(params[:id])
    if current_user != user
      render json: {
        messages: [I18n.t('errors.messages.forbidden')]
      }, status: :forbidden
      return
    end

    render json: {
      id: user.id,
      name: user.name
    }
  end
end
