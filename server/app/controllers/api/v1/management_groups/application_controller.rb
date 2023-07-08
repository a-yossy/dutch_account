# frozen_string_literal: true

class Api::V1::ManagementGroups::ApplicationController < ApplicationController
  before_action :authenticate_user!
  before_action :set_management_group

  private

  def set_management_group
    @management_group = current_user.management_groups.find(params[:management_group_id])
  end
end
