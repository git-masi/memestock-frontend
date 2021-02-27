export function mockApiResponse(data = null, responseTime = 2000) {
  return new Promise((res) => {
    setTimeout(() => {
      res(data);
    }, responseTime);
  });
}
