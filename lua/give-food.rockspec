package = "voxgig-sdk-give-food"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/give-food-sdk.git"
}
description = {
  summary = "GiveFood SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["give-food_sdk"] = "give-food_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
