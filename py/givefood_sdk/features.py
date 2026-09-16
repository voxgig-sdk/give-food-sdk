# GiveFood SDK feature factory

from givefood_sdk.feature.base_feature import GiveFoodBaseFeature
from givefood_sdk.feature.ratelimit_feature import GiveFoodRatelimitFeature
from givefood_sdk.feature.retry_feature import GiveFoodRetryFeature
from givefood_sdk.feature.test_feature import GiveFoodTestFeature
from givefood_sdk.feature.timeout_feature import GiveFoodTimeoutFeature


_FEATURES = {
    "base": lambda: GiveFoodBaseFeature(),
    "ratelimit": lambda: GiveFoodRatelimitFeature(),
    "retry": lambda: GiveFoodRetryFeature(),
    "test": lambda: GiveFoodTestFeature(),
    "timeout": lambda: GiveFoodTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
