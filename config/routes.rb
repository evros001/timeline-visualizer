Rails.application.routes.draw do

  devise_for :users

  resources :users do
    resources :stories do
      resources :locations
    end
  end

  root "home#index"

  get 'markers', to: 'home#markers'
  get 'users/:id/markers', to: 'users#markers'
  get 'users/:id/stories/:id/markers', to: 'stories#markers'

  get 'stories/index', to: 'stories#index'
  get 'users/sign_in', to: 'users#markers'

end
