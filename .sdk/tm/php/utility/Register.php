<?php
declare(strict_types=1);

// GiveFood SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

GiveFoodUtility::setRegistrar(function (GiveFoodUtility $u): void {
    $u->clean = [GiveFoodClean::class, 'call'];
    $u->done = [GiveFoodDone::class, 'call'];
    $u->make_error = [GiveFoodMakeError::class, 'call'];
    $u->feature_add = [GiveFoodFeatureAdd::class, 'call'];
    $u->feature_hook = [GiveFoodFeatureHook::class, 'call'];
    $u->feature_init = [GiveFoodFeatureInit::class, 'call'];
    $u->fetcher = [GiveFoodFetcher::class, 'call'];
    $u->make_fetch_def = [GiveFoodMakeFetchDef::class, 'call'];
    $u->make_context = [GiveFoodMakeContext::class, 'call'];
    $u->make_options = [GiveFoodMakeOptions::class, 'call'];
    $u->make_request = [GiveFoodMakeRequest::class, 'call'];
    $u->make_response = [GiveFoodMakeResponse::class, 'call'];
    $u->make_result = [GiveFoodMakeResult::class, 'call'];
    $u->make_point = [GiveFoodMakePoint::class, 'call'];
    $u->make_spec = [GiveFoodMakeSpec::class, 'call'];
    $u->make_url = [GiveFoodMakeUrl::class, 'call'];
    $u->param = [GiveFoodParam::class, 'call'];
    $u->prepare_auth = [GiveFoodPrepareAuth::class, 'call'];
    $u->prepare_body = [GiveFoodPrepareBody::class, 'call'];
    $u->prepare_headers = [GiveFoodPrepareHeaders::class, 'call'];
    $u->prepare_method = [GiveFoodPrepareMethod::class, 'call'];
    $u->prepare_params = [GiveFoodPrepareParams::class, 'call'];
    $u->prepare_path = [GiveFoodPreparePath::class, 'call'];
    $u->prepare_query = [GiveFoodPrepareQuery::class, 'call'];
    $u->result_basic = [GiveFoodResultBasic::class, 'call'];
    $u->result_body = [GiveFoodResultBody::class, 'call'];
    $u->result_headers = [GiveFoodResultHeaders::class, 'call'];
    $u->transform_request = [GiveFoodTransformRequest::class, 'call'];
    $u->transform_response = [GiveFoodTransformResponse::class, 'call'];
});
