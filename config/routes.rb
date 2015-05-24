Rails.application.routes.draw do
  resources :locations

  resources :users do
    resources :locations
  end

  root "home#index"

end
