# Koa Route Controllers

`Ruby on Rails` style routing for Koa.js.

It uses [koa-router](https://github.com/koajs/router) package underneath, which also provides URL helpers.

## Example

```javascript
// 
// Controller Class
//
class HelloController{
  async home(){
    this.ctx.body = {
      hello: 'abc'
    };
  }

  async welcome(){
    this.ctx.body = {
      welcome: 'abc'
    };
  }
}
```

```javascript
// 
// Koa app
// 
const Koa = require('koa');
const KoaRouteControllers = require('koa-route-controllers');
const HelloController = require('./controllers/hello_controller.js');

// 
// Route Controllers
// 
const routeControllers = new KoaRouteControllers()
.get('/', HelloController, 'home')
.get('/welcome', HelloController, 'welcome')
.get('/new', HelloController, 'new')
.get('/show/:id', HelloController, 'show')
.get('/edit/:id', HelloController, 'edit')
.post('/create', HelloController, 'create')
.patch('/update/:id', HelloController, 'update')
.delete('/destroy/:id', HelloController, 'destroy');


// 
// start Koa app
// 
const app = new Koa();
app.use(routeControllers.routes());
app.listen(3000);
```

```javascript
//
// URL helpers
// 

// Within the class
this.ctx.state.url('hello_home', ...);
this.ctx.state.url('hello_welcome', ...);

// or in the view
url('hello_home', ...);
url('hello_welcome', ...);
```
