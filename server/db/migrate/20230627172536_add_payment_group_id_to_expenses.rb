class AddPaymentGroupIdToExpenses < ActiveRecord::Migration[7.0]
  def change
    add_reference :expenses, :payment_group, null: false, foreign_key: true
  end
end
