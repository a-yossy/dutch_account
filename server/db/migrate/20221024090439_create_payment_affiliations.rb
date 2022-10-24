class CreatePaymentAffiliations < ActiveRecord::Migration[7.0]
  def change
    create_table :payment_affiliations do |t|
      t.references :user, null: false, foreign_key: true
      t.references :payment_group, null: false, foreign_key: true
      t.float :ratio, null: false

      t.timestamps
    end
    add_index :payment_affiliations, [:user_id, :payment_group_id], unique: true
  end
end
