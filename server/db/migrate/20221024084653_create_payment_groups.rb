class CreatePaymentGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :payment_groups do |t|
      t.references :management_group, null: false, foreign_key: true
      t.string :name, null: false

      t.timestamps
    end
    add_index :payment_groups, [:management_group_id, :name], unique: true
  end
end
