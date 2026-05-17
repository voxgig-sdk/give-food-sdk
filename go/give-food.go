package voxgiggivefoodsdk

import (
	"github.com/voxgig-sdk/give-food-sdk/go/core"
	"github.com/voxgig-sdk/give-food-sdk/go/entity"
	"github.com/voxgig-sdk/give-food-sdk/go/feature"
	_ "github.com/voxgig-sdk/give-food-sdk/go/utility"
)

// Type aliases preserve external API.
type GiveFoodSDK = core.GiveFoodSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type GiveFoodEntity = core.GiveFoodEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type GiveFoodError = core.GiveFoodError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewArticleEntityFunc = func(client *core.GiveFoodSDK, entopts map[string]any) core.GiveFoodEntity {
		return entity.NewArticleEntity(client, entopts)
	}
	core.NewDonationpointEntityFunc = func(client *core.GiveFoodSDK, entopts map[string]any) core.GiveFoodEntity {
		return entity.NewDonationpointEntity(client, entopts)
	}
	core.NewFoodbankEntityFunc = func(client *core.GiveFoodSDK, entopts map[string]any) core.GiveFoodEntity {
		return entity.NewFoodbankEntity(client, entopts)
	}
	core.NewItemEntityFunc = func(client *core.GiveFoodSDK, entopts map[string]any) core.GiveFoodEntity {
		return entity.NewItemEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewGiveFoodSDK = core.NewGiveFoodSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
