class UsersController < ApplicationController
    def index
      @users = User.all
    end

    def new
     @user = User.new
    #  @user = User.find_by(params[:id])
    end

   def show
   end

   def create
     @user = User.create(safe_params)
    #  binding.pry
    #  @user = User.find_by(params[:id])
    #  redirect_to user_path(params[:user_id])
   end

  private
   def safe_params
     params.require(:user).permit(:name, :email)
   end
end
