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
        home_hello: this.ctx.state.url('home_hello'),
        welcome_hello: this.ctx.state.url('welcome_hello'),
        new_hello: this.ctx.state.url('new_hello'),
        show_hello: this.ctx.state.url('show_hello', 1),
        edit_hello: this.ctx.state.url('edit_hello', 1),
        create_hello: this.ctx.state.url('create_hello'),
        update_hello: this.ctx.state.url('update_hello', 1),
        destroy_hello: this.ctx.state.url('destroy_hello', 1)
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
.delete('/destroy/:id', HelloController, 'destroy')
.del('/_destroy/:id', HelloController, 'destroy');

const app = new Koa();
app.use(routeControllers.routes());
app.listen(3000);
