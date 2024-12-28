const { strictEqual } = require('node:assert/strict');

module.exports = async (t, request)=>{
  await t.test('get root url', async () => {
    const res = await request.get('/');
    strictEqual(res.body.root, true);
    strictEqual(res.body.beforeValue, 123);
    strictEqual(res.body.currentUrl, '/');
  });

  await t.test('put put url', async () => {
    const res = await request.put('/put/1');
    strictEqual(res.body.put, true);
    strictEqual(res.body.beforeValue, 123);
    strictEqual(res.body.currentUrl, '/put/1');
  });

  await t.test('post post url', async () => {
    const res = await request.post('/post/1');
    strictEqual(res.body.post, true);
    strictEqual(res.body.beforeValue, 123);
    strictEqual(res.body.currentUrl, '/post/1');
  });

  await t.test('patch patch url', async () => {
    const res = await request.patch('/patch/1');
    strictEqual(res.body.patch, true);
    strictEqual(res.body.beforeValue, 123);
    strictEqual(res.body.currentUrl, '/patch/1');
  });

  await t.test('delete delete url', async () => {
    const res = await request.delete('/delete/1');
    strictEqual(res.body.delete, true);
    strictEqual(res.body.beforeValue, 123);
    strictEqual(res.body.currentUrl, '/delete/1');
  });

  await t.test('delete del url', async () => {
    const res = await request.delete('/del/1');
    strictEqual(res.body.del, true);
    strictEqual(res.body.beforeValue, 123);
    strictEqual(res.body.currentUrl, '/del/1');
  });

  await t.test('get routeName url', async () => {
    const res = await request.get('/as_name/1');
    strictEqual(res.body.routeNameAction, true);
    strictEqual(res.body.beforeValue, 123);
    strictEqual(res.body.currentUrl, '/as_name/1');
  });

  await t.test('get actionThatRedirectsInBefore url', async () => {
    const res = await request.get('/actionThatRedirectsInBefore');
    strictEqual(Object.keys(res.body).length, 0);
    strictEqual(res.statusCode, 302);
    strictEqual(res.headers.location, '/abc');
  });

  await t.test('get actionThatThrows400 url', async () => {
    const res = await request.get('/actionThatThrows400');
    strictEqual(Object.keys(res.body).length, 0);
    strictEqual(res.statusCode, 400);
  });

  await t.test('get actionThatThrows404 url', async () => {
    const res = await request.get('/actionThatThrows404');
    strictEqual(Object.keys(res.body).length, 0);
    strictEqual(res.statusCode, 404);
  });

  await t.test('get actionThatDoesNotGetCalled url', async () => {
    const res = await request.get('/actionThatDoesNotGetCalled');
    strictEqual(Object.keys(res.body).length, 0);
    strictEqual(res.statusCode, 400);
  });

  await t.test('redirects url', async () => {
    const res = await request.get('/abc');
    strictEqual(Object.keys(res.body).length, 0);
    strictEqual(res.statusCode, 301);
    strictEqual(res.headers.location, '/bcd');
  });
}
