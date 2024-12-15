// 
// Controller Class
//
class Hello{
  async before(){
    console.log(`> before called for ${this.ctx.state.controllerName}#${this.ctx.state.actionName}.`);
  }

  async home(){
    console.log('> home action called.');

    this.ctx.body = {
      hello: parseInt(Math.random() * 1000),
      urls: {
        hello_home: this.ctx.state.url('hello_home'),
        hello_welcome: this.ctx.state.url('hello_welcome')
      }
    };
  }

  async welcome(){
    console.log('> welcome action called.');
    
    this.ctx.body = {welcome: parseInt(Math.random() * 1000)};
  }
}


// 
// Koa app
// 
const Koa = require('koa');
const KoaRouteControllers = require('../index');

const routeControllers = new KoaRouteControllers()
                      .get('/', Hello, 'home')
                      .get('/welcome', Hello, 'welcome');

const app = new Koa();
app.use(routeControllers.routes());
app.listen(3000);
