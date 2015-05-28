class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :markers]

  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def show
      # @user = User.find(params[:id])
      @markers = @user.markers      
  end

  # def markers
  #   # @user = User.find(params[:id])
  #   @markers = [["Flatiron School", 40.705866, -74.014056, "Learn"]]
  #   respond_to do |format|
  #       format.json {render "../views/stories/markers"}
  #   end
  # end

  def create
    @user = User.create(safe_params)
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

  def safe_params
    params.require(:user).permit(:name, :email, :story_id, :location_id)
  end
end
