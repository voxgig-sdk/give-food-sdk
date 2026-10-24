# GiveFood SDK utility: prepare_body
require_relative 'media'
module GiveFoodUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return GiveFoodUtilities.raw_body(ctx.reqdata) if GiveFoodUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
