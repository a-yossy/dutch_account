# frozen_string_literal: true

class Api::V1::CurrentUsersController < ApplicationController
  before_action :authenticate_user!

  def show
    render json: UserResource.new(current_user).serialize
  end
end
