// 
// App used for testing
// 

// 
// Controller Class
//
class AppController{
  async before(){
    this.beforeValue = 123;

    if(this.state.actionName == 'actionThatThrows400'){
      this.ctx.throw(400);
    }

    if(this.state.actionName == 'actionThatThrows404'){
      this.ctx.throw(404);
    }

    if(this.state.actionName == 'actionThatDoesNotGetCalled'){
      this.ctx.status = 400;
    }

    if(this.state.actionName == 'actionThatRedirectsInBefore'){
      this.ctx.redirect('/abc');
    }
  }

  async root(){
    this.ctx.body = {
      root: true,
      beforeValue: this.beforeValue,
      currentUrl: this.url('app_root')
    };
  }

  async put(){
    this.ctx.body = {
      put: true,
      beforeValue: this.beforeValue,
      currentUrl: this.url('app_put', this.params.id)
    }
  }

  async post(){
    this.ctx.body = {
      post: true,
      beforeValue: this.beforeValue,
      currentUrl: this.url('app_post', this.params.id)
    }
  }

  async patch(){
    this.ctx.body = {
      patch: true,
      beforeValue: this.beforeValue,
      currentUrl: this.url('app_patch', this.params.id)
    }
  }

  async delete(){
    this.ctx.body = {
      delete: true,
      beforeValue: this.beforeValue,
      currentUrl: this.url('app_delete', this.params.id)
    }
  }

  async del(){
    this.ctx.body = {
      del: true,
      beforeValue: this.beforeValue,
      currentUrl: this.url('app_del', this.params.id)
    }
  }

  async routeNameAction(){
    this.ctx.body = {
      routeNameAction: true,
      beforeValue: this.beforeValue,
      currentUrl: this.url('example', this.params.id)
    }
  }

  async actionThatRedirectsInBefore(){
    this.ctx.body = {
      actionName: 'actionThatRedirectsInBefore'
    }
  }

  async actionThatDoesNotGetCalled(){
    this.ctx.body = {
      actionName: 'actionThatDoesNotGetCalled'
    }
  }

  async actionThatThrows400(){
    this.ctx.body = {
      actionName: 'actionThatThrows400'
    }
  }

  async actionThatThrows404(){
    this.ctx.body = {
      actionName: 'actionThatThrows404'
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

// routeName action
.get('/as_name/:id', AppController, 'routeNameAction', 'example')

// Redirects
.get('/actionThatRedirectsInBefore', AppController, 'actionThatRedirectsInBefore')

// before renders without calling action
.get('/actionThatDoesNotGetCalled', AppController, 'actionThatDoesNotGetCalled')
.get('/actionThatThrows400', AppController, 'actionThatThrows400')
.get('/actionThatThrows404', AppController, 'actionThatThrows404')

// redirect
.redirect('/abc', '/bcd')

const app = new Koa();
app.use(routeControllers.routes());

module.exports = app;
