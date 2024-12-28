const test = require('node:test');
const supertest = require('supertest');

const app = require('./app');
let request = null;
let server = null;

test('koa-route-controllers', async (t)=>{
  t.before(async ()=>{
    return new Promise((resolve)=>{
      server = app.listen(resolve);
      request = supertest.agent(server);
    });
  });

  t.after(async ()=>{
    return new Promise((resolve)=>{
      server.close(resolve);
    });
  });

  await require('./app_test')(t, request);
});
