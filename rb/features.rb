# GiveFood SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module GiveFoodFeatures
  def self.make_feature(name)
    case name
    when "base"
      GiveFoodBaseFeature.new
    when "ratelimit"
      GiveFoodRatelimitFeature.new
    when "retry"
      GiveFoodRetryFeature.new
    when "test"
      GiveFoodTestFeature.new
    when "timeout"
      GiveFoodTimeoutFeature.new
    else
      GiveFoodBaseFeature.new
    end
  end
end
