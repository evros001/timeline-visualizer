class User < ActiveRecord::Base
  has_many :stories
  has_many :locations, through: :stories

  def markers
    arr = Array.new
    locations.each do |location|
      arr << [location.name, location.latitude, location.longitude]
    end
    return arr
  end

end
