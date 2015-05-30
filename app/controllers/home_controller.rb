class HomeController < ApplicationController
  def index
  end

  def about 
  end 

  def markers
    @markers = [["Flatiron School", 40.705866, -74.014056, "A Place To Learn"], ["Yankee Stadium", 40.830406, -73.926088, "ballgame!"]]
    respond_to do |format|
        format.json {render :markers}
    end
  end

  # 40.705866, -74.014056
end
