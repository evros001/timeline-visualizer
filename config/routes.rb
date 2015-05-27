Rails.application.routes.draw do

  resources :users do
    resources :stories do
      resources :locations
    end
  end

  root "home#index"
  get 'users/:id/markers', to: 'users#markers'

end
