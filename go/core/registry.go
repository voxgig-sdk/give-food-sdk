package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewArticleEntityFunc func(client *GiveFoodSDK, entopts map[string]any) GiveFoodEntity

var NewDonationPointEntityFunc func(client *GiveFoodSDK, entopts map[string]any) GiveFoodEntity

var NewFoodBankEntityFunc func(client *GiveFoodSDK, entopts map[string]any) GiveFoodEntity

var NewItemEntityFunc func(client *GiveFoodSDK, entopts map[string]any) GiveFoodEntity

