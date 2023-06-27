# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_06_27_172759) do
  create_table "debt_records", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "lending_user_id", null: false
    t.bigint "borrowing_user_id", null: false
    t.bigint "expense_id", null: false
    t.decimal "amount_of_money", precision: 10, scale: 2, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_paid", default: false, null: false
    t.index ["borrowing_user_id", "expense_id"], name: "index_debt_records_on_borrowing_user_id_and_expense_id", unique: true
    t.index ["expense_id"], name: "index_debt_records_on_expense_id"
    t.index ["lending_user_id"], name: "index_debt_records_on_lending_user_id"
  end

  create_table "expenses", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "amount_of_money", null: false
    t.string "description", null: false
    t.date "paid_on", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "payment_group_id", null: false
    t.index ["payment_group_id"], name: "index_expenses_on_payment_group_id"
    t.index ["user_id"], name: "index_expenses_on_user_id"
  end

  create_table "management_affiliations", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "management_group_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["management_group_id"], name: "index_management_affiliations_on_management_group_id"
    t.index ["user_id", "management_group_id"], name: "index_management_affiliations_on_user_id_and_management_group_id", unique: true
    t.index ["user_id"], name: "index_management_affiliations_on_user_id"
  end

  create_table "management_groups", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "payment_affiliations", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "payment_group_id", null: false
    t.decimal "ratio", precision: 3, scale: 2, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["payment_group_id"], name: "index_payment_affiliations_on_payment_group_id"
    t.index ["user_id", "payment_group_id"], name: "index_payment_affiliations_on_user_id_and_payment_group_id", unique: true
    t.index ["user_id"], name: "index_payment_affiliations_on_user_id"
  end

  create_table "payment_groups", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "management_group_id", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["management_group_id", "name"], name: "index_payment_groups_on_management_group_id_and_name", unique: true
    t.index ["management_group_id"], name: "index_payment_groups_on_management_group_id"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "name", null: false
    t.string "email", null: false
    t.text "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "debt_records", "expenses"
  add_foreign_key "debt_records", "users", column: "borrowing_user_id"
  add_foreign_key "debt_records", "users", column: "lending_user_id"
  add_foreign_key "expenses", "payment_groups"
  add_foreign_key "expenses", "users"
  add_foreign_key "management_affiliations", "management_groups"
  add_foreign_key "management_affiliations", "users"
  add_foreign_key "payment_affiliations", "payment_groups"
  add_foreign_key "payment_affiliations", "users"
  add_foreign_key "payment_groups", "management_groups"
end
