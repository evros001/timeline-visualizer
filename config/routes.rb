Rails.application.routes.draw do
  # resources :events
  resources :users do
    resources :events
  end


  # get '/login', to: 'patients#show'

  root "home#index"
end
