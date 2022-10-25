# frozen_string_literal: true

class Api::V1::ManagementGroups::UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: UserResource.new(
      current_user
      .management_groups
      .find(params[:management_group_id])
      .users
      .alphabetical_order
    ).serialize
  end
end
