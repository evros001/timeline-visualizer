class Location < ActiveRecord::Base
  geocoded_by :address
  after_validation :geocode

  belongs_to :story

  validates :name, presence: true
  validates :address, presence: true
  validates :description, presence: true
end
