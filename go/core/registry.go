package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewArticleEntityFunc func(client *GiveFoodSDK, entopts map[string]any) GiveFoodEntity

var NewDonationpointEntityFunc func(client *GiveFoodSDK, entopts map[string]any) GiveFoodEntity

var NewFoodbankEntityFunc func(client *GiveFoodSDK, entopts map[string]any) GiveFoodEntity

var NewItemEntityFunc func(client *GiveFoodSDK, entopts map[string]any) GiveFoodEntity

