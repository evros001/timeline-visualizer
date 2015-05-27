class UsersController < ApplicationController
  # before_action :set_user, only: [:show, :edit, :update]

  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def show
    # if !@user
    #    redirect_to root_path  
    # else
      @user = User.find(params[:id])
      @markers = @user.markers      
    # end
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
    # def set_user
    #   @user = User.find(params[:id])
    # end

  def safe_params
    params.require(:user).permit(:name, :email, :story_id, :location_id)
  end
end
