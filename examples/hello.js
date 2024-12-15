// 
// Controller Class
//
class HelloController{
  async before(){
    console.log(`> before called for ${this.ctx.state.controllerName}#${this.ctx.state.actionName}.`);
  }

  async home(){
    console.log('> home action called.');

    this.ctx.body = {
      hello: parseInt(Math.random() * 1000),
      urls: {
        hello_home: this.ctx.state.url('hello_home'),
        hello_welcome: this.ctx.state.url('hello_welcome'),
        hello_new: this.ctx.state.url('hello_new'),
        hello_show: this.ctx.state.url('hello_show', 1),
        hello_edit: this.ctx.state.url('hello_edit', 1),
        hello_create: this.ctx.state.url('hello_create'),
        hello_update: this.ctx.state.url('hello_update', 1),
        hello_destroy: this.ctx.state.url('hello_destroy', 1),
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
.get('/', HelloController, 'home')
.get('/welcome', HelloController, 'welcome')
.get('/new', HelloController, 'new')
.get('/show/:id', HelloController, 'show')
.get('/edit/:id', HelloController, 'edit')
.post('/create', HelloController, 'create')
.patch('/update/:id', HelloController, 'update')
.delete('/destroy/:id', HelloController, 'destroy');

const app = new Koa();
app.use(routeControllers.routes());
app.listen(3000);
