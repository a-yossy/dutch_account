# frozen_string_literal: true

class Api::V1::ManagementGroups::UsersController < Api::V1::ManagementGroups::ApplicationController
  def index
    render json: UserResource.new(
      @management_group
      .users
      .alphabetical_order
    ).serialize
  end
end
