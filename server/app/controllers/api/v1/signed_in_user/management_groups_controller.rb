# frozen_string_literal: true

class Api::V1::SignedInUser::ManagementGroupsController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: current_user.management_groups.select('id', 'name').alphabetical_order
  end
end
