<?php
declare(strict_types=1);

// GiveFood SDK exists test

require_once __DIR__ . '/../givefood_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = GiveFoodSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
