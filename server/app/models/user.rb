# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :management_affiliations, dependent: :destroy
  has_many :management_groups, through: :management_affiliations

  scope :alphabetical_order, -> { order(:name) }

  validates :name, presence: true, length: { maximum: 20 }
end
