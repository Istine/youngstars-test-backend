// mocking axios post function to be overriden
module.exports = {
    put: jest.fn((url, body, config) => Promise.resolve({}))
}