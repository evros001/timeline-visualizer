Rails.application.routes.draw do

  resources :users do
    resources :locations
  end

  root "home#index"

end
