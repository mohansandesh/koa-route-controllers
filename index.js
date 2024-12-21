const Router = require('@koa/router');

class KoaRouteControllers{
  router = new Router();

  get(path, ControllerClass, actionName, asName=null){
    this.#defineRoute('get', path, ControllerClass, actionName, asName);
    return this;
  }

  put(path, ControllerClass, actionName, asName=null){
    this.#defineRoute('put', path, ControllerClass, actionName, asName);
    return this;
  }

  post(path, ControllerClass, actionName, asName=null){
    this.#defineRoute('post', path, ControllerClass, actionName, asName);
    return this;
  }

  patch(path, ControllerClass, actionName, asName=null){
    this.#defineRoute('patch', path, ControllerClass, actionName, asName);
    return this;
  }

  delete(path, ControllerClass, actionName, asName=null){
    this.#defineRoute('delete', path, ControllerClass, actionName, asName);
    return this;
  }

  del(path, ControllerClass, actionName, asName=null){
    this.#defineRoute('del', path, ControllerClass, actionName, asName);
    return this;
  }

  routes(){
    return this.router.routes();
  }


  // 
  // Private methods
  // 

  #defineRoute(method, path, ControllerClass, actionName, asName=null){
    const controllerName = ControllerClass.name.replace(/Controller$/, '').toLowerCase();
    
    this.router[method](
      asName || `${actionName}_${controllerName}`,
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
};

module.exports = KoaRouteControllers;
