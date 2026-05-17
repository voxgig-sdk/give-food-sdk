
import { Context } from './Context'


class GiveFoodError extends Error {

  isGiveFoodError = true

  sdk = 'GiveFood'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  GiveFoodError
}

