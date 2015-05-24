class EventsController < ApplicationController

  def new
     @event = Event.new
    #  @user = User.find_by(params[:id])
   end
   #
  #  def create
  #    @event = Event.new(safe_params)
  #    @event.user_id = params[:user_id]
  #    @event.save
  #    redirect_to user_path(params[:user_id])
  #  end

   def create
      @event = Event.create(safe_params)
      @user = User.find(params[:user_id])
      @event.user_id = @user.id
      @user.events << @event
     redirect_to user_path(params[:user_id])
   end

  private
   def safe_params
     params.require(:event).permit(:name, :latitude, :longitude)
   end
end


#params[:user_id] = 2
