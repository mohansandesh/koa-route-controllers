const Router = require('@koa/router');

/**
 * Class representing KoaRouteControllers.
 * This class contains all the functionality.
 */
class KoaRouteControllers{
  /**
   * Holds an instance of @koa/router
   */
  router = new Router();

  /**
   * Adds a http get method to the router
   * @param {string} path 
   * @param {*} ControllerClass 
   * @param {string} actionName 
   * @param {string} asName 
   * @returns this
   */
  get(path, ControllerClass, actionName, asName=null){
    this.#defineRoute('get', path, ControllerClass, actionName, asName);
    return this;
  }

  /**
   * Adds a http put method to the router
   * @param {string} path 
   * @param {*} ControllerClass 
   * @param {string} actionName 
   * @param {string} asName 
   * @returns this
   */
  put(path, ControllerClass, actionName, asName=null){
    this.#defineRoute('put', path, ControllerClass, actionName, asName);
    return this;
  }

  /**
   * Adds a http post method to the router
   * @param {string} path 
   * @param {*} ControllerClass 
   * @param {string} actionName 
   * @param {string} asName 
   * @returns this
   */
  post(path, ControllerClass, actionName, asName=null){
    this.#defineRoute('post', path, ControllerClass, actionName, asName);
    return this;
  }

  /**
   * Adds a http patch method to the router
   * @param {string} path 
   * @param {*} ControllerClass 
   * @param {string} actionName 
   * @param {string} asName 
   * @returns this
   */
  patch(path, ControllerClass, actionName, asName=null){
    this.#defineRoute('patch', path, ControllerClass, actionName, asName);
    return this;
  }

  /**
   * Adds a http delete method to the router
   * @param {string} path 
   * @param {*} ControllerClass 
   * @param {string} actionName 
   * @param {string} asName 
   * @returns this
   */
  delete(path, ControllerClass, actionName, asName=null){
    this.#defineRoute('delete', path, ControllerClass, actionName, asName);
    return this;
  }

  /**
   * Adds a http delete method to the router. Alias of delete.
   * @param {string} path 
   * @param {*} ControllerClass 
   * @param {string} actionName 
   * @param {string} asName 
   * @returns this
   */
  del(path, ControllerClass, actionName, asName=null){
    this.#defineRoute('del', path, ControllerClass, actionName, asName);
    return this;
  }

  /**
   * Returns the router middleware to be used in the app.
   * ```
   * const app = new Koa();
   * app.use(routeControllersInstance.routes());
   * ```
   * @returns middleware
   */
  routes(){
    return this.router.routes();
  }


  // 
  // Private methods
  // 

  /**
   * Generic method to define a route.
   * @param {string} method 
   * @param {string} path 
   * @param {*} ControllerClass 
   * @param {string} actionName 
   * @param {string} asName 
   */
  #defineRoute(method, path, ControllerClass, actionName, asName=null){
    const controllerName = ControllerClass.name.replace(/Controller$/, '').toLowerCase();
    
    this.router[method](
      asName || `${actionName}_${controllerName}`,
      path,
      async (ctx) => await this.#routeHandler(ctx, ControllerClass, controllerName, actionName)
    );
  }

  /**
   * Handler to handle a request for a given route
   * @param {*} ctx 
   * @param {*} ControllerClass 
   * @param {string} controllerName 
   * @param {string} actionName 
   */
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
    } else {
      console.error(`Action: ${actionName} not found for Controller: ${ControllerClass.name}`);
    }
  }
};

module.exports = KoaRouteControllers;
