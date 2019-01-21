const ASYNC_TEST_TIMEOUT = process.env.CI ? 20 * 1000 : 5 * 1000
jest.setTimeout(ASYNC_TEST_TIMEOUT)
