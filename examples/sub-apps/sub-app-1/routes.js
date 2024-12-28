// 
// sub-app-1
//
// 

const KoaRouteControllers = require('../../../index');
const HelloController = require('./app/controllers/hello_controller');

function app(pathPrefix) {
  // Hostname and more options can be found here
  // https://github.com/koajs/router/blob/master/API.md#new-routeropts
  const routeControllers = new KoaRouteControllers({
    appName: 'sub-app-1',
    prefix: pathPrefix
  })
  
  .get('/', HelloController, 'home')
  .get('/about', HelloController, 'about');

  return routeControllers.routes();
}

module.exports = app;
