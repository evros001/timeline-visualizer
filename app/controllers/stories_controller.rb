class StoriesController < ApplicationController
  before_action :set_story, only: [:show, :edit, :update, :destroy]
  before_action :verify_user, only: [:edit, :new, :create, :destroy]

  def index
    @user = current_user
    @stories = Story.all
  end

  def show
    @story = Story.find(params[:id])
    @user = User.find(params[:user_id])
  end

  def new
    @story = Story.new
    @user = User.find(params[:user_id])
  end

  def edit
    @story = Story.find(params[:id])
    @user = User.find(params[:user_id])
  end

  def create
    @story = Story.new(strong_params)
    @user = User.find(params[:user_id])
    @story.user_id = @user.id

    respond_to do |format|
      if @story.save
        @user.stories << @story
        format.html { redirect_to new_user_story_location_path(params[:user_id], @story.id), notice: 'Story was successfully created.' }
        format.json { render :show, status: :created, story: @story }
      else
        format.html { render :new }
        format.json { render json: @story.errors, status: :unprocessable_entity }
      end
    end
  end

  def markers
    @story = Story.find(params[:id])
    @markers = @story.markers
    respond_to do |format|
        format.json {render :markers}
    end
  end

  def update
    respond_to do |format|
      if @story.update(strong_params)
        format.html { redirect_to user_path(params[:user_id]), notice: 'Story was successfully updated.' }
        format.json { render :show, status: :ok, story: @story }
      else
        format.html { render :edit }
        format.json { render json: @story.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @story.destroy
    respond_to do |format|
      format.html { redirect_to user_path(params[:user_id]), notice: 'Story was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_story
      @story = Story.find(params[:id])
    end

    def strong_params
      params.require(:story).permit(:name, :description, :user_id, :location_id)
    end

    def verify_user
      if !user_signed_in? || current_user.id.to_s != params[:user_id]
        redirect_to root_path
      end
    end
end
