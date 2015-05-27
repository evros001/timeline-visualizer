class LocationsController < ApplicationController
  before_action :set_location, only: [:show, :edit, :update, :destroy]

  def index
    @locations = Location.all
  end

  def show
    @location = Location.find(params[:id])
    @story = Story.find(params[:story_id])
    @user = User.find(params[:user_id])
  end

  def new
    @location = Location.new
  end

  def edit
    @location = Location.find(params[:id])
    @story = Story.find(params[:story_id])
    @user = User.find(params[:user_id])
  end

  def create
    @location = Location.new(strong_params)
    @story = Story.find(params[:story_id])
    @user = User.find(params[:user_id])
    @location.story_id = @story.id

    respond_to do |format|
      if @location.save
        @story.locations << @location
        format.html { redirect_to user_path(params[:user_id]), notice: 'Location was successfully created.' }
        format.json { render :show, status: :created, location: @location }
      else
        format.html { render :new }
        format.json { render json: @location.errors, status: :unprocessable_entity }
      end
    end
  end

  def markers
    @location = Location.new(strong_params)
    @story = Story.find(params[:story_id])
    @user = User.find(params[:user_id])
    binding.pry
  end

  def update
    respond_to do |format|
      if @location.update(strong_params)
        format.html { redirect_to user_path(params[:user_id]), notice: 'Location was successfully updated.' }
        format.json { render :show, status: :ok, location: @location }
      else
        format.html { render :edit }
        format.json { render json: @location.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @location.destroy
    respond_to do |format|
      format.html { redirect_to user_path(params[:user_id]), notice: 'Location was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_location
      @location = Location.find(params[:id])
    end

    def strong_params
      params.require(:location).permit(:name, :address, :latitude, :longitude)
    end
end
