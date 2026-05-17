<?php
declare(strict_types=1);

// GiveFood SDK utility: result_headers

class GiveFoodResultHeaders
{
    public static function call(GiveFoodContext $ctx): ?GiveFoodResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
