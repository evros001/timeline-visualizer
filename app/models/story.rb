class Story < ActiveRecord::Base
  belongs_to :user
  has_many :locations

  validates :name, presence: true
  validates :description, presence: true

  def markers
    arr = Array.new
    locations.each do |location|
      arr << [location.name, location.latitude, location.longitude, location.description]
    end
    return arr
  end

end
