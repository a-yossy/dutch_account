# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :management_affiliations, dependent: :destroy
  has_many :management_groups, through: :management_affiliations
  has_many :payment_affiliations, dependent: :destroy
  has_many :payment_groups, through: :payment_affiliations
  has_many :expenses, dependent: :destroy
  has_many :lending_debt_records, inverse_of: 'lending_user', dependent: :destroy
  has_many :borrowing_debt_records, inverse_of: 'borrowing_user', dependent: :destroy

  scope :alphabetical_order, -> { order(:name) }

  validates :name, presence: true, length: { maximum: 20 }
end
