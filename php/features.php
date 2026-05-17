<?php
declare(strict_types=1);

// GiveFood SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class GiveFoodFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new GiveFoodBaseFeature();
            case "test":
                return new GiveFoodTestFeature();
            default:
                return new GiveFoodBaseFeature();
        }
    }
}
