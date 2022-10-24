Rails.application.routes.draw do
  # devise_token_authのテストがmappingで落ちるため記載
  devise_for :user, skip: :all

  namespace :api do
    namespace :v1 do
      devise_scope :user do
        post '/sign_up', to: 'registrations#create'
        post '/log_in', to: 'sessions#create'
        delete '/log_out', to: 'sessions#destroy'
      end

      resource :current_user, only: %i[show]
      resources :management_groups, only: %i[index show] do
        resources :users, only: %i[index], module: :management_groups
        resources :payment_groups, only: %i[index show], module: :management_groups
      end
    end
  end
end
