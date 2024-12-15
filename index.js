const Router = require('@koa/router');

class KoaRouteControllers{
  constructor(){
    this.router = new Router();
  }

  get(path, ControllerClass, actionName){
    this.#defineRoute('get', path, ControllerClass, actionName);
    return this;
  }

  put(path, ControllerClass, actionName){
    this.#defineRoute('put', path, ControllerClass, actionName);
    return this;
  }

  post(path, ControllerClass, actionName){
    this.#defineRoute('post', path, ControllerClass, actionName);
    return this;
  }

  patch(path, ControllerClass, actionName){
    this.#defineRoute('patch', path, ControllerClass, actionName);
    return this;
  }

  delete(path, ControllerClass, actionName){
    this.#defineRoute('delete', path, ControllerClass, actionName);
    return this;
  }

  #defineRoute(method, path, ControllerClass, actionName){
    this.router[method](
      `${ControllerClass.name.toLowerCase()}_${actionName}`,
      path,
      async (ctx) => await this.#routeHandler(ctx, ControllerClass, actionName)
    );
  }

  async #routeHandler(ctx, ControllerClass, actionName){
    const classInstance = new ControllerClass();
    classInstance.ctx = ctx;

    // Add some meta data to ctx state
    ctx.state.controllerName = ControllerClass.name;
    ctx.state.actionName = actionName;
    ctx.state.url = this.router.url.bind(this.router);

    if(typeof(classInstance.before) === 'function'){
      await classInstance.before();
    }
    
    if(typeof(classInstance[actionName]) === 'function'){
      await classInstance[actionName]();
    }
  }
  
  routes(){
    return this.router.routes();
  }
};

module.exports = KoaRouteControllers;
