
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'GiveFood',
        slug: "give-food",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
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
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://www.givefood.org.uk/api/2",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        article: {
        },
  
        donation_point: {
        },
  
        food_bank: {
        },
  
        item: {
        },
  
    }
  }


  entity = {
    "article": {
      "fields": [
        {
          "name": "foodbank_slug",
          "title": "Foodbank Slug",
          "type": "`$STRING`",
          "short": "Related food bank identifier"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Unique identifier for the article"
        },
        {
          "name": "published",
          "title": "Published",
          "type": "`$STRING`",
          "short": "Publication date",
          "format": "date-time"
        },
        {
          "name": "source",
          "title": "Source",
          "type": "`$STRING`",
          "short": "Publication source"
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`",
          "short": "Article title"
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "short": "URL to the article",
          "format": "uri"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                  "lit": "articles"
                }
              ],
              "parts": [
                "articles"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "json"
                  }
                ]
              },
              "select": {
                "exist": [
                  "format"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "donation_point": {
      "fields": [
        {
          "name": "address",
          "title": "Address",
          "type": "`$STRING`",
          "short": "Physical address"
        },
        {
          "name": "foodbank_slug",
          "title": "Foodbank Slug",
          "type": "`$STRING`",
          "short": "Associated food bank identifier"
        },
        {
          "name": "latitude",
          "title": "Latitude",
          "type": "`$NUMBER`",
          "short": "Latitude coordinate",
          "format": "double"
        },
        {
          "name": "longitude",
          "title": "Longitude",
          "type": "`$NUMBER`",
          "short": "Longitude coordinate",
          "format": "double"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Name of the donation point"
        },
        {
          "name": "postcode",
          "title": "Postcode",
          "type": "`$STRING`",
          "short": "Postal code"
        },
        {
          "name": "slug",
          "title": "Slug",
          "type": "`$STRING`",
          "short": "Unique identifier for the donation point"
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "short": "Type of donation point (e.g., supermarket, collection point)"
        }
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
                  "lit": "donationpoints"
                }
              ],
              "parts": [
                "donationpoints"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "json"
                  }
                ]
              },
              "select": {
                "exist": [
                  "format"
                ]
              }
            }
          ]
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
                  "lit": "donationpoints"
                },
                {
                  "var": "slug"
                }
              ],
              "parts": [
                "donationpoints",
                "{slug}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "slug",
                    "orig": "slug",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "json"
                  }
                ]
              },
              "select": {
                "exist": [
                  "format",
                  "slug"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "food_bank": {
      "fields": [
        {
          "name": "address",
          "title": "Address",
          "type": "`$STRING`",
          "short": "Physical address of the food bank"
        },
        {
          "name": "email",
          "title": "Email",
          "type": "`$STRING`",
          "short": "Contact email address",
          "format": "email"
        },
        {
          "name": "items_needed",
          "title": "Items Needed",
          "type": "`$ARRAY`",
          "short": "List of items currently needed for donation"
        },
        {
          "name": "latitude",
          "title": "Latitude",
          "type": "`$NUMBER`",
          "short": "Latitude coordinate",
          "format": "double"
        },
        {
          "name": "longitude",
          "title": "Longitude",
          "type": "`$NUMBER`",
          "short": "Longitude coordinate",
          "format": "double"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Name of the food bank"
        },
        {
          "name": "needs",
          "title": "Needs",
          "type": "`$OBJECT`",
          "short": "Current needs status"
        },
        {
          "name": "phone",
          "title": "Phone",
          "type": "`$STRING`",
          "short": "Contact phone number"
        },
        {
          "name": "postcode",
          "title": "Postcode",
          "type": "`$STRING`",
          "short": "Postal code"
        },
        {
          "name": "shopping_list_url",
          "title": "Shopping List Url",
          "type": "`$STRING`",
          "short": "URL to the food bank's detailed shopping list",
          "format": "uri"
        },
        {
          "name": "slug",
          "title": "Slug",
          "type": "`$STRING`",
          "short": "Unique identifier for the food bank"
        },
        {
          "name": "updated",
          "title": "Updated",
          "type": "`$STRING`",
          "short": "Last update timestamp",
          "format": "date-time"
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "short": "Website URL",
          "format": "uri"
        }
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
                  "lit": "foodbanks"
                }
              ],
              "parts": [
                "foodbanks"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "json"
                  }
                ]
              },
              "select": {
                "exist": [
                  "format"
                ]
              }
            }
          ]
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
                  "lit": "foodbanks"
                },
                {
                  "var": "slug"
                }
              ],
              "parts": [
                "foodbanks",
                "{slug}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "slug",
                    "orig": "slug",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "json"
                  }
                ]
              },
              "select": {
                "exist": [
                  "format",
                  "slug"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "item": {
      "fields": [
        {
          "name": "created",
          "title": "Created",
          "type": "`$STRING`",
          "short": "When this need was recorded",
          "format": "date-time"
        },
        {
          "name": "foodbank_slug",
          "title": "Foodbank Slug",
          "type": "`$STRING`",
          "short": "Food bank identifier"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Unique identifier for the item need record"
        },
        {
          "name": "item",
          "title": "Item",
          "type": "`$STRING`",
          "short": "Name of the item needed"
        },
        {
          "name": "updated",
          "title": "Updated",
          "type": "`$STRING`",
          "short": "Last update timestamp",
          "format": "date-time"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                  "lit": "items"
                }
              ],
              "parts": [
                "items"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "json"
                  }
                ]
              },
              "select": {
                "exist": [
                  "format"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

