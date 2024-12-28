// 
// main-app
//

const KoaRouteControllers = require('../../../index');
const HelloController = require('./app/controllers/hello_controller');

function main_app(){
  // Main app routes
  const mainAppControllers = new KoaRouteControllers()
  .get('/', HelloController, 'home')
  .get('/about', HelloController, 'about');

  return mainAppControllers.routes();
}

module.exports = main_app;
