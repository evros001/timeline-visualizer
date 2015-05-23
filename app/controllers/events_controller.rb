class EventsController < ApplicationController

  def new
     @event = Event.new
    #  @user = User.find_by(params[:id])
   end

   def create
     @event = Event.create(safe_params)
    #  binding.pry
    #  @user = User.find_by(params[:id])
     redirect_to user_path(params[:user_id])
   end

  private
   def safe_params
     params.require(:event).permit(:name, :latitude, :longitude, :user_id)
   end
end
