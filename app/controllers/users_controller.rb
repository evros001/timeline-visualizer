class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

    def index
      @users = User.all
    end

    def new
     @user = User.new
    end

   def show
     @user = User.find(params[:id])
     @markers = @user.markers
    #  @markers = [
    #     ['Flatiron School', 40.705329,-74.01397],
    #     ['Brooklyn Museum', 40.671206,-73.963631],
    #     ['The Grand Canyon', 36.3078536,-112.7834806]
    # ];
   end

   def markers
    @user = User.find(params[:id])
    @markers = @user.markers
    respond_to do |format|
        format.json {render :markers}
    end
   end

   def create
     @user = User.create(safe_params)
   end

  private
    def set_user
      @user = User.find(params[:id])
    end

   def safe_params
     params.require(:user).permit(:name, :email, :location_id)
   end
end
