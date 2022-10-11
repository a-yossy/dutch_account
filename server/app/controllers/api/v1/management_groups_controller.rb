# frozen_string_literal: true

class Api::V1::ManagementGroupsController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: current_user.management_groups.select('id', 'name').alphabetical_order
  end

  def show
    render json: current_user.management_groups.select('id', 'name').find(params[:id])
  end
end
