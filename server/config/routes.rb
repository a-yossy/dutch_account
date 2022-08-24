Rails.application.routes.draw do
  # devise_token_authのテストがmappingで落ちるため記載
  devise_for :admin, skip: :all

  namespace :api do
    namespace :v1 do
      devise_scope :admin do
        post '/sign_up', to: 'registrations#create'
        post '/sign_in', to: 'sessions#create'
        delete '/sign_out', to: 'sessions#destroy'
      end
    end
  end
end
