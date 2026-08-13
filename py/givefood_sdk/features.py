# GiveFood SDK feature factory

from givefood_sdk.feature.base_feature import GiveFoodBaseFeature
from givefood_sdk.feature.test_feature import GiveFoodTestFeature


def _make_feature(name):
    features = {
        "base": lambda: GiveFoodBaseFeature(),
        "test": lambda: GiveFoodTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
