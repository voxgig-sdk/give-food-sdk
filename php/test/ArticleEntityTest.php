<?php
declare(strict_types=1);

// Article entity test

require_once __DIR__ . '/../givefood_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ArticleEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = GiveFoodSDK::test(null, null);
        $ent = $testsdk->Article(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = article_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "article." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set GIVEFOOD_TEST_ARTICLE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $article_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.article")));
        $article_ref01_data = null;
        if (count($article_ref01_data_raw) > 0) {
            $article_ref01_data = Helpers::to_map($article_ref01_data_raw[0][1]);
        }

        // LIST
        $article_ref01_ent = $client->Article(null);
        $article_ref01_match = [];

        [$article_ref01_list_result, $err] = $article_ref01_ent->list($article_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($article_ref01_list_result);

    }
}

function article_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/article/ArticleTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = GiveFoodSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["article01", "article02", "article03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("GIVEFOOD_TEST_ARTICLE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "GIVEFOOD_TEST_ARTICLE_ENTID" => $idmap,
        "GIVEFOOD_TEST_LIVE" => "FALSE",
        "GIVEFOOD_TEST_EXPLAIN" => "FALSE",
        "GIVEFOOD_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["GIVEFOOD_TEST_ARTICLE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["GIVEFOOD_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["GIVEFOOD_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new GiveFoodSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["GIVEFOOD_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["GIVEFOOD_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
