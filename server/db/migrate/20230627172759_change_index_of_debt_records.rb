class ChangeIndexOfDebtRecords < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :debt_records, column: :borrowing_user_id
    remove_foreign_key :debt_records, column: :lending_user_id
    remove_foreign_key :debt_records, column: :expense_id

    remove_index :debt_records, name: 'index_debt_records_on_lending_and_borrowing_and_expense'

    add_index :debt_records, :lending_user_id
    remove_index :debt_records, :borrowing_user_id
    add_index :debt_records, [:borrowing_user_id, :expense_id], unique: true

    add_foreign_key :debt_records, :users, column: :borrowing_user_id
    add_foreign_key :debt_records, :users, column: :lending_user_id
    add_foreign_key :debt_records, :expenses, column: :expense_id
  end
end
