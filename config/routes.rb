Rails.application.routes.draw do
  resources :events

  resources :users

  root "home#index"
end
