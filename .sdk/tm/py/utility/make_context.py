# GiveFood SDK utility: make_context

from core.context import GiveFoodContext


def make_context_util(ctxmap, basectx):
    return GiveFoodContext(ctxmap, basectx)
