# GiveFood SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module GiveFoodFeatures
  def self.make_feature(name)
    case name
    when "base"
      GiveFoodBaseFeature.new
    when "test"
      GiveFoodTestFeature.new
    else
      GiveFoodBaseFeature.new
    end
  end
end
