class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :stories
  has_many :locations, through: :stories

  validates :name, uniqueness: true

  def markers
    arr = Array.new
    locations.each do |location|
      arr << [location.name, location.latitude, location.longitude, location.description]
    end
    return arr
  end

end
