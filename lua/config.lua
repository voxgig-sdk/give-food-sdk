-- GiveFood SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "GiveFood",
      slug = "give-food",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://www.givefood.org.uk/api/2",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["article"] = {},
        ["donationpoint"] = {},
        ["foodbank"] = {},
        ["item"] = {},
      },
    },
    entity = {
      ["article"] = {
        ["fields"] = {
          {
            ["name"] = "foodbank_slug",
            ["short"] = "Related food bank identifier",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Unique identifier for the article",
            ["type"] = "`$INTEGER`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "published",
            ["short"] = "Publication date",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "source",
            ["short"] = "Publication source",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "title",
            ["short"] = "Article title",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "uri",
            ["name"] = "url",
            ["short"] = "URL to the article",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "article",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "json",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/articles/",
                ["segments"] = {
                  {
                    ["lit"] = "articles",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "format",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "articles",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["donationpoint"] = {
        ["fields"] = {
          {
            ["name"] = "address",
            ["short"] = "Physical address",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "foodbank_slug",
            ["short"] = "Associated food bank identifier",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "double",
            ["name"] = "latitude",
            ["short"] = "Latitude coordinate",
            ["type"] = "`$NUMBER`",
          },
          {
            ["format"] = "double",
            ["name"] = "longitude",
            ["short"] = "Longitude coordinate",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "name",
            ["short"] = "Name of the donation point",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "postcode",
            ["short"] = "Postal code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "slug",
            ["short"] = "Unique identifier for the donation point",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["short"] = "Type of donation point (e.g., supermarket, collection point)",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "donationpoint",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "json",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/donationpoints/",
                ["segments"] = {
                  {
                    ["lit"] = "donationpoints",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "format",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "donationpoints",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "slug",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = "json",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/donationpoints/{slug}/",
                ["rename"] = {
                  ["param"] = {
                    ["slug"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "donationpoints",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "format",
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "donationpoints",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["foodbank"] = {
        ["fields"] = {
          {
            ["name"] = "address",
            ["short"] = "Physical address of the food bank",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "email",
            ["name"] = "email",
            ["short"] = "Contact email address",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "items_needed",
            ["short"] = "List of items currently needed for donation",
            ["type"] = "`$ARRAY`",
          },
          {
            ["format"] = "double",
            ["name"] = "latitude",
            ["short"] = "Latitude coordinate",
            ["type"] = "`$NUMBER`",
          },
          {
            ["format"] = "double",
            ["name"] = "longitude",
            ["short"] = "Longitude coordinate",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "name",
            ["short"] = "Name of the food bank",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "needs",
            ["short"] = "Current needs status",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "phone",
            ["short"] = "Contact phone number",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "postcode",
            ["short"] = "Postal code",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "uri",
            ["name"] = "shopping_list_url",
            ["short"] = "URL to the food bank's detailed shopping list",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "slug",
            ["short"] = "Unique identifier for the food bank",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "updated",
            ["short"] = "Last update timestamp",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "uri",
            ["name"] = "url",
            ["short"] = "Website URL",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "foodbank",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "json",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/foodbanks/",
                ["segments"] = {
                  {
                    ["lit"] = "foodbanks",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "format",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "foodbanks",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "slug",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = "json",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/foodbanks/{slug}/",
                ["rename"] = {
                  ["param"] = {
                    ["slug"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "foodbanks",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "format",
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "foodbanks",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["item"] = {
        ["fields"] = {
          {
            ["format"] = "date-time",
            ["name"] = "created",
            ["short"] = "When this need was recorded",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "foodbank_slug",
            ["short"] = "Food bank identifier",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Unique identifier for the item need record",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "item",
            ["short"] = "Name of the item needed",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "updated",
            ["short"] = "Last update timestamp",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "item",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "json",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/items/",
                ["segments"] = {
                  {
                    ["lit"] = "items",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "format",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "items",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
