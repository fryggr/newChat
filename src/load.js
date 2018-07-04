export default (url, type, data) => {
  return new Promise((success, fail) => {
    const request = new XMLHttpRequest();
    request.open(type, url, true);

    request.addEventListener('load', () => {
      request.status >= 200 && request.status < 400
        ? success(request.responseText)
        : fail(new Error(`Request Failed: ${request.statusText}`));
    });

    request.addEventListener('error', () => {
      fail(new Error('Network Error'));
    });

    type === 'GET' ? request.send() : request.send(data);

    // request.send();
  });
};
