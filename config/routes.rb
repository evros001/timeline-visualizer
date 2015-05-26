Rails.application.routes.draw do

  resources :users do
    resources :locations 
  end

  root "home#index"
  get 'users/:id/markers', to: 'users#markers'

end
