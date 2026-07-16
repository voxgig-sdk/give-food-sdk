<?php
declare(strict_types=1);

// GiveFood SDK base feature

class GiveFoodBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(GiveFoodContext $ctx, array $options): void {}
    public function PostConstruct(GiveFoodContext $ctx): void {}
    public function PostConstructEntity(GiveFoodContext $ctx): void {}
    public function SetData(GiveFoodContext $ctx): void {}
    public function GetData(GiveFoodContext $ctx): void {}
    public function GetMatch(GiveFoodContext $ctx): void {}
    public function SetMatch(GiveFoodContext $ctx): void {}
    public function PrePoint(GiveFoodContext $ctx): void {}
    public function PreSpec(GiveFoodContext $ctx): void {}
    public function PreRequest(GiveFoodContext $ctx): void {}
    public function PreResponse(GiveFoodContext $ctx): void {}
    public function PreResult(GiveFoodContext $ctx): void {}
    public function PreDone(GiveFoodContext $ctx): void {}
    public function PreUnexpected(GiveFoodContext $ctx): void {}
}
