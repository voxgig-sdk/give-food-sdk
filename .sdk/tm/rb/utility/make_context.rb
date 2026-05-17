# GiveFood SDK utility: make_context
require_relative '../core/context'
module GiveFoodUtilities
  MakeContext = ->(ctxmap, basectx) {
    GiveFoodContext.new(ctxmap, basectx)
  }
end
