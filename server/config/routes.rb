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
        resources :payment_groups, only: %i[index show], module: :management_groups do
          resources :payment_affiliations, only: %i[index], module: :payment_groups
        end
        scope module: :management_groups do
          resources :payment_relations, only: %i[] do
            post 'bulk_insert', on: :collection
          end
        end
      end
      resources :payment_groups, only: %i[show] do
        resources :expense_with_debt_records, only: %i[], module: :payment_groups do
          post 'bulk_insert', on: :collection
        end
      end
    end
  end
end
