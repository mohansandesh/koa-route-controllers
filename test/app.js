// 
// App used for testing
// 

// 
// Controller Class
//
class AppController{
  async before(){
    this.beforeValue = 123;

    if(this.ctx.state.actionName == 'actionThatDoesNotGetCalled'){
      this.ctx.throw(400);
    }
  }

  async root(){
    this.ctx.body = {
      root: true,
      beforeValue: this.beforeValue,
      currentUrl: this.ctx.state.url('root_app')
    };
  }

  async put(){
    this.ctx.body = {
      put: true,
      beforeValue: this.beforeValue,
      currentUrl: this.ctx.state.url('put_app', 1)
    }
  }

  async post(){
    this.ctx.body = {
      post: true,
      beforeValue: this.beforeValue,
      currentUrl: this.ctx.state.url('post_app', 1)
    }
  }

  async patch(){
    this.ctx.body = {
      patch: true,
      beforeValue: this.beforeValue,
      currentUrl: this.ctx.state.url('patch_app', 1)
    }
  }

  async delete(){
    this.ctx.body = {
      delete: true,
      beforeValue: this.beforeValue,
      currentUrl: this.ctx.state.url('delete_app', 1)
    }
  }

  async del(){
    this.ctx.body = {
      del: true,
      beforeValue: this.beforeValue,
      currentUrl: this.ctx.state.url('del_app', 1)
    }
  }

  async asNameAction(){
    this.ctx.body = {
      asNameAction: true,
      beforeValue: this.beforeValue,
      currentUrl: this.ctx.state.url('example', 1)
    }
  }

  async actionThatDoesNotGetCalled(){
    this.ctx.body = {
      actionName: 'actionThatDoesNotGetCalled'
    }
  }
}


// 
// Koa app
// 
const Koa = require('koa');
const KoaRouteControllers = require('../index');

const routeControllers = new KoaRouteControllers()
.get('/', AppController, 'root')
.put('/put/:id', AppController, 'put')
.post('/post/:id', AppController, 'post')
.patch('/patch/:id', AppController, 'patch')
.delete('/delete/:id', AppController, 'delete')
.del('/del/:id', AppController, 'del')

// asName action
.get('/as_name/:id', AppController, 'asNameAction', 'example')

// before renders without calling action
.get('/actionThatDoesNotGetCalled', AppController, 'actionThatDoesNotGetCalled')

const app = new Koa();
app.use(routeControllers.routes());

module.exports = app;
