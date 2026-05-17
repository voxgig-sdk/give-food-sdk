# ProjectName SDK exists test

import pytest
from givefood_sdk import GiveFoodSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = GiveFoodSDK.test(None, None)
        assert testsdk is not None
