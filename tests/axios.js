// mocking axios put function to be overriden
module.exports = {
    put: jest.fn((url, body, config) => Promise.resolve({}))
}

/**
 * This is a mock axios put request to enable mocking of a particular request using jest
 */