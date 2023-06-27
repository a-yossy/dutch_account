class AddIsPaidToDebtRecords < ActiveRecord::Migration[7.0]
  def change
    add_column :debt_records, :is_paid, :boolean, null: false, default: false
  end
end
