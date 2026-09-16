<?php
declare(strict_types=1);

// GiveFood SDK configuration

class GiveFoodConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "GiveFood",
                "slug" => "give-food",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://www.givefood.org.uk/api/2",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "article" => [],
                    "donationpoint" => [],
                    "foodbank" => [],
                    "item" => [],
                ],
            ],
            "entity" => [
        'article' => [
          'fields' => [
            [
              'name' => 'foodbank_slug',
              'short' => 'Related food bank identifier',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the article',
              'type' => '`$INTEGER`',
            ],
            [
              'format' => 'date-time',
              'name' => 'published',
              'short' => 'Publication date',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'source',
              'short' => 'Publication source',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'title',
              'short' => 'Article title',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'uri',
              'name' => 'url',
              'short' => 'URL to the article',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'article',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'json',
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/articles/',
                  'segments' => [
                    [
                      'lit' => 'articles',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'format',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'articles',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'donationpoint' => [
          'fields' => [
            [
              'name' => 'address',
              'short' => 'Physical address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'foodbank_slug',
              'short' => 'Associated food bank identifier',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'double',
              'name' => 'latitude',
              'short' => 'Latitude coordinate',
              'type' => '`$NUMBER`',
            ],
            [
              'format' => 'double',
              'name' => 'longitude',
              'short' => 'Longitude coordinate',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'name',
              'short' => 'Name of the donation point',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'postcode',
              'short' => 'Postal code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'slug',
              'short' => 'Unique identifier for the donation point',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'type',
              'short' => 'Type of donation point (e.g., supermarket, collection point)',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'donationpoint',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'json',
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/donationpoints/',
                  'segments' => [
                    [
                      'lit' => 'donationpoints',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'format',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'donationpoints',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'slug',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 'json',
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/donationpoints/{slug}/',
                  'rename' => [
                    'param' => [
                      'slug' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'donationpoints',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'format',
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'donationpoints',
                    '{id}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'foodbank' => [
          'fields' => [
            [
              'name' => 'address',
              'short' => 'Physical address of the food bank',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'email',
              'name' => 'email',
              'short' => 'Contact email address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'items_needed',
              'short' => 'List of items currently needed for donation',
              'type' => '`$ARRAY`',
            ],
            [
              'format' => 'double',
              'name' => 'latitude',
              'short' => 'Latitude coordinate',
              'type' => '`$NUMBER`',
            ],
            [
              'format' => 'double',
              'name' => 'longitude',
              'short' => 'Longitude coordinate',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'name',
              'short' => 'Name of the food bank',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'needs',
              'short' => 'Current needs status',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'phone',
              'short' => 'Contact phone number',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'postcode',
              'short' => 'Postal code',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'uri',
              'name' => 'shopping_list_url',
              'short' => 'URL to the food bank\'s detailed shopping list',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'slug',
              'short' => 'Unique identifier for the food bank',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'date-time',
              'name' => 'updated',
              'short' => 'Last update timestamp',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'uri',
              'name' => 'url',
              'short' => 'Website URL',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'foodbank',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'json',
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/foodbanks/',
                  'segments' => [
                    [
                      'lit' => 'foodbanks',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'format',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'foodbanks',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'slug',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 'json',
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/foodbanks/{slug}/',
                  'rename' => [
                    'param' => [
                      'slug' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'foodbanks',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'format',
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'foodbanks',
                    '{id}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'item' => [
          'fields' => [
            [
              'format' => 'date-time',
              'name' => 'created',
              'short' => 'When this need was recorded',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'foodbank_slug',
              'short' => 'Food bank identifier',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the item need record',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'item',
              'short' => 'Name of the item needed',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'date-time',
              'name' => 'updated',
              'short' => 'Last update timestamp',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'item',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'json',
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/items/',
                  'segments' => [
                    [
                      'lit' => 'items',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'format',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'items',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return GiveFoodFeatures::make_feature($name);
    }
}
