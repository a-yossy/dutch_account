# frozen_string_literal: true

class Api::V1::ManagementGroups::UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: current_user.management_groups
                             .find(params[:management_group_id])
                             .users
                             .select('id', 'name')
                             .alphabetical_order
  end
end
