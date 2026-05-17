# GiveFood SDK utility: feature_add
module GiveFoodUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
