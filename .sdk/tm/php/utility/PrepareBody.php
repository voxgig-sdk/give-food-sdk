<?php
declare(strict_types=1);

// GiveFood SDK utility: prepare_body

class GiveFoodPrepareBody
{
    public static function call(GiveFoodContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
