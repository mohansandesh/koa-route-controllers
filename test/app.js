// 
// Controller Class
//
class AppController{
  async before(){
    this.beforeValue = 123;
  }

  async root(){
    this.ctx.body = {
      root: true,
      beforeValue: this.beforeValue,
      currentUrl: this.ctx.state.url('app_root')
    };
  }

  async put(){
    this.ctx.body = {
      put: true,
      beforeValue: this.beforeValue,
      currentUrl: this.ctx.state.url('app_put', 1)
    }
  }

  async post(){
    this.ctx.body = {
      post: true,
      beforeValue: this.beforeValue,
      currentUrl: this.ctx.state.url('app_post', 1)
    }
  }

  async patch(){
    this.ctx.body = {
      patch: true,
      beforeValue: this.beforeValue,
      currentUrl: this.ctx.state.url('app_patch', 1)
    }
  }

  async delete(){
    this.ctx.body = {
      delete: true,
      beforeValue: this.beforeValue,
      currentUrl: this.ctx.state.url('app_delete', 1)
    }
  }

  async del(){
    this.ctx.body = {
      del: true,
      beforeValue: this.beforeValue,
      currentUrl: this.ctx.state.url('app_del', 1)
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

const app = new Koa();
app.use(routeControllers.routes());

module.exports = app;
