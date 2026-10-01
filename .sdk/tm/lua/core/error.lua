-- GiveFood SDK error

local json = require("dkjson")

local GiveFoodError = {}
GiveFoodError.__index = GiveFoodError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function GiveFoodError.new(code, msg, ctx)
  local self = setmetatable({}, GiveFoodError)
  self.is_sdk_error = true
  self.sdk = "GiveFood"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  CONTEXT[self] = ctx
  return self
end


function GiveFoodError:context()
  return CONTEXT[self]
end


function GiveFoodError:error()
  return self.msg
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function GiveFoodError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function GiveFoodError:to_json()
  return json.encode(self:to_table())
end


function GiveFoodError:__tostring()
  return self.msg
end


function GiveFoodError.__tojson(self)
  return self:to_json()
end


return GiveFoodError
