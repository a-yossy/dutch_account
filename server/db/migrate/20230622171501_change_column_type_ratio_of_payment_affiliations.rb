class ChangeColumnTypeRatioOfPaymentAffiliations < ActiveRecord::Migration[7.0]
  def change
    change_column :payment_affiliations, :ratio, :decimal, precision: 3, scale: 2, null: false
  end
end
