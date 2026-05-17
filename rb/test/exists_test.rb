# GiveFood SDK exists test

require "minitest/autorun"
require_relative "../GiveFood_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = GiveFoodSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
