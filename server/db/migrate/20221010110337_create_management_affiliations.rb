class CreateManagementAffiliations < ActiveRecord::Migration[7.0]
  def change
    create_table :management_affiliations do |t|
      t.references :user, null: false, foreign_key: true
      t.references :management_group, null: false, foreign_key: true

      t.timestamps
    end
    add_index :management_affiliations, [:user_id, :management_group_id], unique: true
  end
end
