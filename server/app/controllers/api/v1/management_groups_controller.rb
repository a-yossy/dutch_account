# frozen_string_literal: true

class Api::V1::ManagementGroupsController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: ManagementGroupResource.new(current_user.management_groups.alphabetical_order).serialize
  end

  def show
    render json: ManagementGroupResource.new(current_user.management_groups.find(params[:id])).serialize
  end
end
