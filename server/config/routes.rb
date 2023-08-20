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
      resource :user, only: %i[show]
      resources :management_groups, only: %i[index show] do
        scope module: :management_groups do
          resources :users, only: %i[index]
          resources :total_borrowing_and_lendings, only: %i[index]
          resources :payment_groups, only: %i[index show destroy] do
            scope module: :payment_groups do
              resources :payment_affiliations, only: %i[index]
              resources :expenses, only: %i[index show update destroy] do
                post 'bulk_insert', on: :collection
              end
            end
          end
          resources :debt_records, only: %i[] do
            patch 'mark_as_paid', on: :collection
          end
        end
        scope module: :management_groups do
          resources :payment_relations, only: %i[] do
            post 'bulk_insert', on: :collection
            patch 'bulk_update', on: :collection
          end
        end
      end
    end
  end
end
