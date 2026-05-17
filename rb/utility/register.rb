# GiveFood SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

GiveFoodUtility.registrar = ->(u) {
  u.clean = GiveFoodUtilities::Clean
  u.done = GiveFoodUtilities::Done
  u.make_error = GiveFoodUtilities::MakeError
  u.feature_add = GiveFoodUtilities::FeatureAdd
  u.feature_hook = GiveFoodUtilities::FeatureHook
  u.feature_init = GiveFoodUtilities::FeatureInit
  u.fetcher = GiveFoodUtilities::Fetcher
  u.make_fetch_def = GiveFoodUtilities::MakeFetchDef
  u.make_context = GiveFoodUtilities::MakeContext
  u.make_options = GiveFoodUtilities::MakeOptions
  u.make_request = GiveFoodUtilities::MakeRequest
  u.make_response = GiveFoodUtilities::MakeResponse
  u.make_result = GiveFoodUtilities::MakeResult
  u.make_point = GiveFoodUtilities::MakePoint
  u.make_spec = GiveFoodUtilities::MakeSpec
  u.make_url = GiveFoodUtilities::MakeUrl
  u.param = GiveFoodUtilities::Param
  u.prepare_auth = GiveFoodUtilities::PrepareAuth
  u.prepare_body = GiveFoodUtilities::PrepareBody
  u.prepare_headers = GiveFoodUtilities::PrepareHeaders
  u.prepare_method = GiveFoodUtilities::PrepareMethod
  u.prepare_params = GiveFoodUtilities::PrepareParams
  u.prepare_path = GiveFoodUtilities::PreparePath
  u.prepare_query = GiveFoodUtilities::PrepareQuery
  u.result_basic = GiveFoodUtilities::ResultBasic
  u.result_body = GiveFoodUtilities::ResultBody
  u.result_headers = GiveFoodUtilities::ResultHeaders
  u.transform_request = GiveFoodUtilities::TransformRequest
  u.transform_response = GiveFoodUtilities::TransformResponse
}
