<?php
declare(strict_types=1);

// GiveFood SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class GiveFoodMakeContext
{
    public static function call(array $ctxmap, ?GiveFoodContext $basectx): GiveFoodContext
    {
        return new GiveFoodContext($ctxmap, $basectx);
    }
}
