Rails.application.routes.draw do

  devise_for :users

  resources :users do
    resources :stories do
      resources :locations
    end
  end

  root "home#index"

  get 'users/:id/markers', to: 'users#markers'
  get 'users/:id/stories/:id/markers', to: 'stories#markers'

  get 'stories/index', to: 'stories#index'

end
