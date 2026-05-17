-- GiveFood SDK error

local GiveFoodError = {}
GiveFoodError.__index = GiveFoodError


function GiveFoodError.new(code, msg, ctx)
  local self = setmetatable({}, GiveFoodError)
  self.is_sdk_error = true
  self.sdk = "GiveFood"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function GiveFoodError:error()
  return self.msg
end


function GiveFoodError:__tostring()
  return self.msg
end


return GiveFoodError
