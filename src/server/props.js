
// Using async/await Promise.resolve to show you could do something asynchronous here - like an API request
export default () => async (request, response) => await Promise.resolve({ url: request.url });
