# frozen_string_literal: true

class Api::V1::CurrentUsersController < ApplicationController
  before_action :authenticate_user!

  def show
    render json: {
      id: current_user.id,
      name: current_user.name
    }
  end
end
