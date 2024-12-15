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
    const controllerName = ControllerClass.name.replace('Controller', '').toLowerCase();
    
    this.router[method](
      `${controllerName}_${actionName}`,
      path,
      async (ctx) => await this.#routeHandler(ctx, ControllerClass, controllerName, actionName)
    );
  }

  async #routeHandler(ctx, ControllerClass, controllerName, actionName){
    const classInstance = new ControllerClass();
    classInstance.ctx = ctx;

    // Add some meta data to ctx state
    ctx.state.controllerName = controllerName;
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
