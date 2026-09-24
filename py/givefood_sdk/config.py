# GiveFood SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "GiveFood",
            "slug": "give-food",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://www.givefood.org.uk/api/2",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "article": {},
                "donation_point": {},
                "food_bank": {},
                "item": {},
            },
        },
        "entity": {
      "article": {
        "fields": [
          {
            "name": "foodbank_slug",
            "title": "Foodbank Slug",
            "type": "`$STRING`",
            "short": "Related food bank identifier",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "short": "Unique identifier for the article",
          },
          {
            "name": "published",
            "title": "Published",
            "type": "`$STRING`",
            "short": "Publication date",
            "format": "date-time",
          },
          {
            "name": "source",
            "title": "Source",
            "type": "`$STRING`",
            "short": "Publication source",
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "short": "Article title",
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "short": "URL to the article",
            "format": "uri",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "article",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/articles/",
                "segments": [
                  {
                    "lit": "articles",
                  },
                ],
                "parts": [
                  "articles",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "json",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "format",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "donation_point": {
        "fields": [
          {
            "name": "address",
            "title": "Address",
            "type": "`$STRING`",
            "short": "Physical address",
          },
          {
            "name": "foodbank_slug",
            "title": "Foodbank Slug",
            "type": "`$STRING`",
            "short": "Associated food bank identifier",
          },
          {
            "name": "latitude",
            "title": "Latitude",
            "type": "`$NUMBER`",
            "short": "Latitude coordinate",
            "format": "double",
          },
          {
            "name": "longitude",
            "title": "Longitude",
            "type": "`$NUMBER`",
            "short": "Longitude coordinate",
            "format": "double",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "Name of the donation point",
          },
          {
            "name": "postcode",
            "title": "Postcode",
            "type": "`$STRING`",
            "short": "Postal code",
          },
          {
            "name": "slug",
            "title": "Slug",
            "type": "`$STRING`",
            "short": "Unique identifier for the donation point",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "short": "Type of donation point (e.g., supermarket, collection point)",
          },
        ],
        "name": "donation_point",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/donationpoints/",
                "segments": [
                  {
                    "lit": "donationpoints",
                  },
                ],
                "parts": [
                  "donationpoints",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "json",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "format",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/donationpoints/{slug}/",
                "segments": [
                  {
                    "lit": "donationpoints",
                  },
                  {
                    "var": "slug",
                  },
                ],
                "parts": [
                  "donationpoints",
                  "{slug}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "slug",
                      "orig": "slug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "json",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "format",
                    "slug",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "food_bank": {
        "fields": [
          {
            "name": "address",
            "title": "Address",
            "type": "`$STRING`",
            "short": "Physical address of the food bank",
          },
          {
            "name": "email",
            "title": "Email",
            "type": "`$STRING`",
            "short": "Contact email address",
            "format": "email",
          },
          {
            "name": "items_needed",
            "title": "Items Needed",
            "type": "`$ARRAY`",
            "short": "List of items currently needed for donation",
          },
          {
            "name": "latitude",
            "title": "Latitude",
            "type": "`$NUMBER`",
            "short": "Latitude coordinate",
            "format": "double",
          },
          {
            "name": "longitude",
            "title": "Longitude",
            "type": "`$NUMBER`",
            "short": "Longitude coordinate",
            "format": "double",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "Name of the food bank",
          },
          {
            "name": "needs",
            "title": "Needs",
            "type": "`$OBJECT`",
            "short": "Current needs status",
          },
          {
            "name": "phone",
            "title": "Phone",
            "type": "`$STRING`",
            "short": "Contact phone number",
          },
          {
            "name": "postcode",
            "title": "Postcode",
            "type": "`$STRING`",
            "short": "Postal code",
          },
          {
            "name": "shopping_list_url",
            "title": "Shopping List Url",
            "type": "`$STRING`",
            "short": "URL to the food bank's detailed shopping list",
            "format": "uri",
          },
          {
            "name": "slug",
            "title": "Slug",
            "type": "`$STRING`",
            "short": "Unique identifier for the food bank",
          },
          {
            "name": "updated",
            "title": "Updated",
            "type": "`$STRING`",
            "short": "Last update timestamp",
            "format": "date-time",
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "short": "Website URL",
            "format": "uri",
          },
        ],
        "name": "food_bank",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/foodbanks/",
                "segments": [
                  {
                    "lit": "foodbanks",
                  },
                ],
                "parts": [
                  "foodbanks",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "json",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "format",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/foodbanks/{slug}/",
                "segments": [
                  {
                    "lit": "foodbanks",
                  },
                  {
                    "var": "slug",
                  },
                ],
                "parts": [
                  "foodbanks",
                  "{slug}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "slug",
                      "orig": "slug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "json",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "format",
                    "slug",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "item": {
        "fields": [
          {
            "name": "created",
            "title": "Created",
            "type": "`$STRING`",
            "short": "When this need was recorded",
            "format": "date-time",
          },
          {
            "name": "foodbank_slug",
            "title": "Foodbank Slug",
            "type": "`$STRING`",
            "short": "Food bank identifier",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "short": "Unique identifier for the item need record",
          },
          {
            "name": "item",
            "title": "Item",
            "type": "`$STRING`",
            "short": "Name of the item needed",
          },
          {
            "name": "updated",
            "title": "Updated",
            "type": "`$STRING`",
            "short": "Last update timestamp",
            "format": "date-time",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "item",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/items/",
                "segments": [
                  {
                    "lit": "items",
                  },
                ],
                "parts": [
                  "items",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "json",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "format",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
