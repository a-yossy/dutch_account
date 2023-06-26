# frozen_string_literal: true

class ExpenseWithDebtRecordsResource
  include Alba::Resource

  has_many :expenses, resource: ExpenseResource
end
