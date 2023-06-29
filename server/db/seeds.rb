# frozen_string_literal: true

User.create!(name: 'no-relation', email: 'norelation@example.com', password: 'password')
user = User.create!(name: 'name', email: 'email@example.com', password: 'password')

5.times do |i|
  management_group = ManagementGroup.create!(name: "group_name_#{i + 1}")
  ManagementAffiliation.create!(user:, management_group:) if i < 3
end

10.times do |i|
  payment_group = PaymentGroup.create!(management_group: ManagementGroup.find((i % 5) + 1), name: "group_name_#{i + 1}")
  PaymentAffiliation.create!(user:, payment_group:, ratio: 0.4) if i < 3
end

50.times do |i|
  user = User.create!(name: "name_#{i + 1}", email: "email#{i + 1}@example.com", password: 'password')
  ManagementAffiliation.create!(user:, management_group: ManagementGroup.find((i % 5) + 1))
  unless [1, 2, 3].include?((i % 10) + 1) && i >= 30
    PaymentAffiliation.create!(user:, payment_group: PaymentGroup.find((i % 10) + 1), ratio: 0.2)
  end
end

User.find_by(email: 'email@example.com').payment_groups.each_with_index do |payment_group, i|
  ExpenseWithDebtRecordsCreator.new(
    expenses_params: [{
      user_id: User.find_by(email: 'email@example.com').id.to_s,
      amount_of_money: 1000 * (i + 1),
      description: "食費_#{i + 1}",
      paid_on: Time.zone.today
    }],
    payment_group:
  ).call!
end
