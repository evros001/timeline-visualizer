class User < ActiveRecord::Base
  has_many :locations

  def markers
    arr = Array.new
    locations.each do |location|
      arr << [location.address, location.latitude, location.longitude] 
    end
    return arr 
  end 
  
end
