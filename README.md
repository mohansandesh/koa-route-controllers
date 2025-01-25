# Koa Route Controllers

MVC controller routing for *Koa.js*. Define app routes as MVC controller actions.

## Features

* MVC controller classes and actions
* Before and after action filters
* URL Helpers (From [koa-router](https://github.com/koajs/router), which is used internally for routing.)
* Sub-apps

## Example

Here is an example of routes and a controller class. [More examples](#examples).

```js
// Koa app
const Koa = require('koa');
const KoaRouteControllers = require('koa-route-controllers');
const HelloController = require('./hello_controller.js');

// Route Controllers
const routeControllers = new KoaRouteControllers()
.get('/', HelloController, 'home')
.get('/new', HelloController, 'new')
.get('/show/:id', HelloController, 'show')
.get('/edit/:id', HelloController, 'edit')
.post('/create', HelloController, 'create')
.patch('/update/:id', HelloController, 'update')
.delete('/destroy/:id', HelloController, 'destroy');

// Start Koa app
const app = new Koa();
app.use(routeControllers.routes());
app.listen(3000);
```

```js
// Controller Class
class HelloController {
  // home action
  async home() {
    this.ctx.body = {
      hello: 'Koa'
    };
  }

  // show action
  async show() {
    this.ctx.body = {
      show: 'post'
    };
  }

  // More actions
}
```

## Install

```
npm install koa-route-controllers
```

## API

### KoaRouteControllers constructor

The constructor takes options specified [here](https://github.com/koajs/router/blob/master/API.md#new-routeropts).

Additionally it accepts an `appName` property. Which is used when creating [sub-app controllers](#examples). Default value is `main`.

```js
// examples
const routeControllers = new KoaRouteControllers();
const routeControllers = new KoaRouteControllers({ prefix: '/example' });
const routeControllers = new KoaRouteControllers({ host: 'hosta.com' });
const routeControllers = new KoaRouteControllers({ appName: 'sub-app-1' });
```

### KoaRouteControllers Instance

`KoaRouteControllers` class instance provides the below http methods. These methods can be chained.

Each of the http methods takes a `path` string, `ControllerClass` reference, `actionName` string and an optional `routeName` string. If `routeName` is null, it is automatically set to `controllerName_actionName`, all lowercase.

`path` string can contain [URL parameters](https://github.com/koajs/router/blob/master/API.md#url-parameters) defined with a `:`, for example - `/show/:post_id/:comment_id`. Params can be accessed in actions with `this.params` (or `this.ctx.params`), for example `this.params.post_id` and `this.params.comment_id`. Querystring params can be accessed using `this.query` (or `this.ctx.query`).

### get

Define a http `get` route.

```js
get(path, ControllerClass, actionName, routeName=null)
```

### post

Define a http `post` route.

```js
post(path, ControllerClass, actionName, routeName=null)
```

### put

Define a http `put` route.

```js
put(path, ControllerClass, actionName, routeName=null)
```

### patch

Define a http `patch` route.

```js
patch(path, ControllerClass, actionName, routeName=null)
```

### delete

Define a http `delete` route.

```js
delete(path, ControllerClass, actionName, routeName=null)
```

### del

Alias to `delete`.

### Other methods

### redirect

Define a `redirect`. Redirects with 301 status code by default.

```js
redirect(source, destination, code=null)
```

### routes

Returns the routes middleware to be used with the Koa app.

```js
// Example
const app = new Koa();
app.use(routeControllers.routes());
```

### router

This property contains the koa-router instance.

## Controller Class

For every request, a matched controller class is automatically instantiated. Then the `action` instance method is called.

### Before Action

If the controller class has an instance method `before`, it is called before calling the action method. This is useful, for example, when a controller action must be skipped.

If before action rendered or redirected, controller action and after action will not be called.

```js
// before action example
class PostsController {
  async before() {
    if(user == false){
      // This will redirect and stop further execution of controller
      this.ctx.redirect('/login');
    }
  }

  // actions
}
```

### After Action

If the controller class has an instance method `after`, it is called after calling the `action` method.

```js
// after action example
class PostsController {
  async after() {
    console.log(`${this.state.controllerName}#${this.state.actionName} has rendered`);
  }

  // actions
}
```

### Properties

The following properties are available in controller actions.

| Property    | Description |
| ----------- | ----------- |
| this.ctx    | ctx - Koa ctx |
| this.state  | ctx.state - Koa ctx state  |
| this.params | ctx.params - Current route params  |
| this.query  | ctx.query - Current querystring params  |
| this.url    | ctx.state.url - URL Helper function |

### State

The following properties are available in `this.state`. `this.state` is just an alias of Koa `ctx.state`.

| Property | Description |
| -------- | ----------- |
| this.state.controllerName | Current request controller name |
| this.state.actionName | Current request action name |
| this.state.routePath | Current request route path (Note: This is not the current URL) |
| this.state.routeName | Current request route name |
| this.state.url | URL helper function |
| this.state.appName | Name of the app |
| this.state.routerOpts | Options used in initializing this.router |
| this.state.hasRendered | Flag if the request has rendered or redirected. It may mean the response is only set, but not sent yet. |

### URL Helpers

URL helper method `url` is available in `this.url` or `this.ctx.state.url`. For example - `this.url('controllerName_actionName', param1, param2, ...)`. In a view just `url(...)` will suffice, as `ctx.state` is available in views.

[Here](https://github.com/koajs/router/blob/master/API.md#routerurlname-params-options--string--error) is the list of all options supported by the URL helper method.

Note that the word `Controller` is removed from `controllerName`. An example URL would be `url('posts_show', 1)` for `PostsController#show`.

## Notes

### koa-router

[koa-router](https://github.com/koajs/router) is used for actual routing.

If the `router` instance is needed for additional setup (ex: [allowedMethods](https://github.com/koajs/router/blob/master/API.md#routerallowedmethodsoptions--function)), it can be accessed using `routeControllersInstance.router`. koa-router API can be found [here](https://github.com/koajs/router/blob/master/API.md).

### Controller Helpers

[Here](https://github.com/mohansandesh/koa-route-controllers/blob/main/examples/blog/app/controllers/base_controller.js) is an example of a base controller that defines `render` helper.

### App Directory Structure

Koa Route Controllers doesn't require a particular app directory structure. Infact everything can be written in a [single js file](https://github.com/mohansandesh/koa-route-controllers/blob/main/examples/hello.js). 

Below examples offer a way of organizing files.

The only optional convention is controller class name be `NameController` (ex: `PostsController`). This lets the route name automatically be set to `posts_actionname`, removing the word `Controller`. This also lets classes be identified as controllers.

### Examples

Here are some examples apps. To run these examples, clone the repo, run `npm install` and run `node examples/example-name`.

| | |
| --------- | ----- |
| [Hello](https://github.com/mohansandesh/koa-route-controllers/blob/main/examples/hello.js) | A basic Hello example. |
| [Blog](https://github.com/mohansandesh/koa-route-controllers/blob/main/examples/blog) | A MVC blog example with posts and comments. |
| [Todo](https://github.com/mohansandesh/koa-route-controllers/blob/main/examples/todo.js) | An API only todo list app. |
| [Sub-apps](https://github.com/mohansandesh/koa-route-controllers/blob/main/examples/sub-apps) | An example of a main app, which has two sub apps, sub-app-1 and sub-app-2. |

## License

MIT
