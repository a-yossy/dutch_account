class CreateDebtRecords < ActiveRecord::Migration[7.0]
  def change
    create_table :debt_records do |t|
      t.references :lending_user, null: false, foreign_key: {to_table: :users}, index: false
      t.references :borrowing_user, null: false, foreign_key: {to_table: :users}
      t.references :expense, null: false, foreign_key: true
      t.integer :amount_of_money, null: false

      t.timestamps

    end
    add_index :debt_records, [:lending_user_id, :borrowing_user_id, :expense_id], unique: true, name: 'index_debt_records_on_lending_and_borrowing_and_expense'
  end
end
