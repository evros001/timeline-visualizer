Rails.application.routes.draw do
  # resources :events
  resources :users do
    resources :events
  end

  root "home#index"

end
