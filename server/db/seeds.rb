# frozen_string_literal: true

User.create!(name: 'no-relation', email: 'norelation@example.com', password: 'password')
user = User.create!(name: 'name', email: 'email@example.com', password: 'password')

5.times do |i|
  management_group = ManagementGroup.create!(name: "group_name_#{i + 1}")
  ManagementAffiliation.create!(user:, management_group:) if i < 3
end

50.times do |i|
  user = User.create!(name: "name_#{i + 1}", email: "email#{i + 1}@example.com", password: 'password')
  ManagementAffiliation.create!(user:, management_group: ManagementGroup.find(((i + 1) % 5) + 1))
end
