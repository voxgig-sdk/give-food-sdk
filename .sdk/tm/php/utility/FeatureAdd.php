<?php
declare(strict_types=1);

// GiveFood SDK utility: feature_add

class GiveFoodFeatureAdd
{
    public static function call(GiveFoodContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
