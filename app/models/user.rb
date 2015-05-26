class User < ActiveRecord::Base
  has_many :locations

  def markers
    arr = Array.new
    locations.each do |location|
      arr << [location.name, location.latitude, location.longitude] 
    end
    return arr 
  end 
  
end
