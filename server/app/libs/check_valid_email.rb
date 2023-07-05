# frozen_string_literal: true

class CheckValidEmail
  VALID_EMAIL_REGEX = /\A[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}\z/

  def initialize(email)
    @email = email
  end

  def call!
    @email.match(VALID_EMAIL_REGEX)

    return if $LAST_MATCH_INFO.present?

    raise InvalidEmailError, '有効なメールアドレスを入力してください'
  end
end
