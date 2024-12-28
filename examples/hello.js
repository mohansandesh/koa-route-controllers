/**
 * 
 * A basic Hello example
 * 
 * Everything is in this single js file
 * 
 * To run: node examples/hello.js
 * 
 */

// 
// Controller Class
//
class HelloController{
  // Before called before every action
  // Render or redirect to not call action
  async before(){
    console.log(`> before called for ${this.state.controllerName}#${this.state.actionName}.`);
  }

  // After called after every action
  async after(){
    console.log(`> after called for ${this.state.controllerName}#${this.state.actionName}.`);
  }

  async home(){
    console.log('> home action called.');

    this.ctx.body = {
      hello: parseInt(Math.random() * 1000)
    };
  }

  async welcome(){
    console.log('> welcome action called.');
    
    this.ctx.body = {
      welcome: parseInt(Math.random() * 1000)
    };
  }
}


// 
// Koa app
// 
const Koa = require('koa');
const KoaRouteControllers = require('../index');

const routeControllers = new KoaRouteControllers()
.get('/', HelloController, 'home')
.get('/welcome', HelloController, 'welcome')

const app = new Koa();
app.use(routeControllers.routes());
app.listen(3000);

console.log('> Example listening on http://localhost:3000');
