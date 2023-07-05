# frozen_string_literal: true

class Api::V1::UsersController < ApplicationController
  def show
    CheckValidEmail.new(params[:email]).call!
    user = User.find_by!(email: params[:email])
    render json: UserResource.new(user).serialize
  rescue InvalidEmailError => e
    render_bad_request_error(e)
  end
end
