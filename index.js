/**
 * Ruby on Rails style MVC controller routing for Koa.js 
 *
 * @author Mohan Sandesh
 * @link https://github.com/mohansandesh/koa-route-controllers
 */

const Router = require('@koa/router');

/**
 * KoaRouteControllers class.
 * 
 * Example:
 * ```
 * const routeControllers = new KoaRouteControllers()
 * .get('/', HelloController, 'home')
 * .get('/new', HelloController, 'new')
 * ```
 * 
 * Optionally, while instantiating, pass router options as defined in the below URL
 * https://github.com/koajs/router/blob/master/API.md#new-routeropts
 *
 * Example:
 * ``` 
 * new KoaRouteControllers({ host: 'hosta.com' })
 * ```
 */
class KoaRouteControllers {
  /**
   * Holds an instance of @koa/router
   */
  router = null;

  /**
   * Holds the name of the app.
   * Default value is main.
   * When using sub-app controllers, set this to sub-app name
   * 
   * This value will be available in this.state.appName in controllers
   */
  appName = 'main';

  // Pass router options as defined here
  // https://github.com/koajs/router/blob/master/API.md#new-routeropts
  constructor(opts=undefined) {
    if(opts && opts.appName){
      // This is KoaRouteControllers option only
      this.appName = opts.appName;

      // this.router doesn't need opts.appName
      delete opts.appName;
    }

    this.router = new Router(opts);
  }

  /**
   * Adds a http get method to the router
   * @param {string} path 
   * @param {*} ControllerClass 
   * @param {string} actionName 
   * @param {string} routeName 
   * @returns this
   */
  get(path, ControllerClass, actionName, routeName=null) {
    this.#defineRoute('get', path, ControllerClass, actionName, routeName);
    return this;
  }

  /**
   * Adds a http post method to the router
   * @param {string} path 
   * @param {*} ControllerClass 
   * @param {string} actionName 
   * @param {string} routeName 
   * @returns this
   */
  post(path, ControllerClass, actionName, routeName=null) {
    this.#defineRoute('post', path, ControllerClass, actionName, routeName);
    return this;
  }

  /**
   * Adds a http put method to the router
   * @param {string} path 
   * @param {*} ControllerClass 
   * @param {string} actionName 
   * @param {string} routeName 
   * @returns this
   */
  put(path, ControllerClass, actionName, routeName=null) {
    this.#defineRoute('put', path, ControllerClass, actionName, routeName);
    return this;
  }

  /**
   * Adds a http patch method to the router
   * @param {string} path 
   * @param {*} ControllerClass 
   * @param {string} actionName 
   * @param {string} routeName 
   * @returns this
   */
  patch(path, ControllerClass, actionName, routeName=null) {
    this.#defineRoute('patch', path, ControllerClass, actionName, routeName);
    return this;
  }

  /**
   * Adds a http delete method to the router
   * @param {string} path 
   * @param {*} ControllerClass 
   * @param {string} actionName 
   * @param {string} routeName 
   * @returns this
   */
  delete(path, ControllerClass, actionName, routeName=null) {
    this.#defineRoute('delete', path, ControllerClass, actionName, routeName);
    return this;
  }

  /**
   * Adds a http delete method to the router. Alias of delete.
   * @param {string} path 
   * @param {*} ControllerClass 
   * @param {string} actionName 
   * @param {string} routeName 
   * @returns this
   */
  del(path, ControllerClass, actionName, routeName=null) {
    this.#defineRoute('del', path, ControllerClass, actionName, routeName);
    return this;
  }

  /**
   * Redirect source to destination URL with optional 30x status code
   * @param {string} source 
   * @param {string} destination 
   * @param {*} code 
   */
  redirect(source, destination, code=null) {
    this.router.redirect(source, destination, code);
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
  routes() {
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
   * @param {string} routeName 
   */
  #defineRoute(method, path, ControllerClass, actionName, routeName) {
    // Remove the word Controller from controller class name, and make it lowercase
    // Ex: PostsController name becomes posts
    const controllerName = ControllerClass.name.replace(/Controller$/i, '').toLowerCase();

    // Ex: RouteName for PostsController#show becomes posts_show, unless set
    const _routeName = routeName || `${controllerName}_${actionName}`;
    
    // Define the route in this.router
    this.router[method](
      _routeName,
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
  async #routeHandler(ctx, ControllerClass, controllerName, actionName) {
    // Add some meta data to ctx state
    ctx.state.controllerName = controllerName;
    ctx.state.actionName = actionName;
    ctx.state.routePath = ctx._matchedRoute;
    ctx.state.routeName = ctx._matchedRouteName;
    ctx.state.appName = this.appName;
    ctx.state.routerOpts = this.router.opts;
    ctx.state.url = this.router.url.bind(this.router);

    // Flag if request already rendered or redirected
    // Koa sets initial status code to 404 and body to undefined.
    ctx.state.hasRendered = !(ctx.status === 404 && ctx.body === undefined);

    // Instantiate controller class
    // 
    // If ControllerClass has a constructor and needs access to ctx, it is available
    // Do not render or redirect in the constructor. It is only for configuration.
    const classInstance = new ControllerClass(ctx);

    // Set this.ctx to ctx
    classInstance.ctx = ctx;

    // Shorter this. access to some often used ctx properties
    classInstance.state = ctx.state;
    classInstance.params = ctx.params;
    classInstance.query = ctx.query;
    classInstance.url = ctx.state.url;

    // Run before action if exists
    if(typeof(classInstance.before) === 'function'){
      await classInstance.before();

      ctx.state.hasRendered = !(ctx.status === 404 && ctx.body === undefined);
    }
    
    // Halt if before action hasRendered.
    // Which means halt if before rendered or redirected.
    // If we are halting, after action will also not get called.
    // 
    // Use ctx.throw(404) to halt with 404,
    // as status change will not be detected with just ctx.status = 404.
    if(!ctx.state.hasRendered){
      // Run controller action if exists
      if(typeof(classInstance[actionName]) === 'function'){
        await classInstance[actionName]();

        ctx.state.hasRendered = !(ctx.status === 404 && ctx.body === undefined);
      }

      // Run after action if exists
      if(typeof(classInstance.after) === 'function'){
        await classInstance.after();

        ctx.state.hasRendered = !(ctx.status === 404 && ctx.body === undefined);
      }
    }
  }
};

module.exports = KoaRouteControllers;
