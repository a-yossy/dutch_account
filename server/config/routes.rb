Rails.application.routes.draw do
  # devise_token_authのテストがmappingで落ちるため記載
  devise_for :user, skip: :all

  namespace :api do
    namespace :v1 do
      devise_scope :user do
        post '/sign_up', to: 'registrations#create'
        post '/sign_in', to: 'sessions#create'
        delete '/sign_out', to: 'sessions#destroy'
      end

      resources :users, only: %i[show]
    end
  end
end
