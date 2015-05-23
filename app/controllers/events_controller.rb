class EventsController < ApplicationController

  def new
     @event = Event.new
     @user = User.find_by(params[:id])
   end

   def create
     @event = Event.create(safe_params)
     @user = User.find_by(params[:id])
     redirect_to @event
   end

  private
   def safe_params
     params.require(:event).permit(:name, :latitude, :longitude)
   end
end
