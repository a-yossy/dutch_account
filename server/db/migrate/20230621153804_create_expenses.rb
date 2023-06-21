class CreateExpenses < ActiveRecord::Migration[7.0]
  def change
    create_table :expenses do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :amount_of_money, null: false
      t.string :description, null: false
      t.date :paid_on, null: false

      t.timestamps
    end
  end
end
