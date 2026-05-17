-- ProjectName SDK exists test

local sdk = require("give-food_sdk")

describe("GiveFoodSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
