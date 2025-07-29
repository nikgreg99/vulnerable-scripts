
# vulnerable.rb

require 'sinatra'
require 'json'

# Simulate a Rails-like route
post '/login' do
  username = params[:username]
  password = params[:password]

  # Vulnerable to SQL injection
  query = "SELECT * FROM users WHERE username = '#{username}' AND password = '#{password}'"
  result = DB.execute(query)

  # Sensitive info exposure
  puts "Login attempt: user=#{username}, password=#{password}"

  result.to_json
end

# Simulate an insecure deserialization
post '/deserialize' do
  object = eval(params[:data]) # dangerous: arbitrary code execution
  object.to_s
end
