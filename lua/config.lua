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
            ["name"] = "url",
            ["short"] = "URL to the article",
            ["type"] = "`$STRING`",
          },
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
                ["parts"] = {
                  "articles",
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
            ["name"] = "latitude",
            ["short"] = "Latitude coordinate",
            ["type"] = "`$NUMBER`",
          },
          {
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
                ["parts"] = {
                  "donationpoints",
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
                ["parts"] = {
                  "donationpoints",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["slug"] = "id",
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
            ["name"] = "email",
            ["short"] = "Contact email address",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "items_needed",
            ["short"] = "List of items currently needed for donation",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "latitude",
            ["short"] = "Latitude coordinate",
            ["type"] = "`$NUMBER`",
          },
          {
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
            ["name"] = "updated",
            ["short"] = "Last update timestamp",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "url",
            ["short"] = "Website URL",
            ["type"] = "`$STRING`",
          },
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
                ["parts"] = {
                  "foodbanks",
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
                ["parts"] = {
                  "foodbanks",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["slug"] = "id",
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
            ["name"] = "updated",
            ["short"] = "Last update timestamp",
            ["type"] = "`$STRING`",
          },
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
                ["parts"] = {
                  "items",
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
