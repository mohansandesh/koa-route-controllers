# Koa Route Controllers

*Ruby on Rails* style routing for *Koa.js*. Define app routes as controller actions.

It uses [koa-router](https://github.com/koajs/router) package underneath, which also provides URL helpers.

## Example

Below is an example of a controller and routes. Find a working [basic example](examples/hello.js) and a [blog example](examples/blog/) in the examples directory.

```js
// Controller Class
class HelloController{
  // home action
  async home() {
    this.ctx.body = {
      hello: 'Koa'
    };
  }

  // More actions
}
```

```js
// Koa app
const Koa = require('koa');
const KoaRouteControllers = require('koa-route-controllers');
const HelloController = require('./app/controllers/hello_controller.js');

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

## API

`KoaRouteControllers` class instance provides the below http methods. These methods can be chained.

Each of the http methods takes a `path` string, `ControllerClass` reference, `actionName` string and an optional `asName` string. If `asName` is null, it is automatically set to `actionName_controllerName`.

`path` string can contain params defined with a `:`, for example - `/show/:post_id/:comment_id`. Params can be accessed in actions with `this.ctx.params.name`, for example `this.ctx.params.post_id` and `this.ctx.params.comment_id`.

URL helper method `url` is available in `this.ctx.state.url`. For example - `this.ctx.state.url('actionName_controllerName', param1, param2, ...)`. `this.state` is made available in views, so that just `url` can be used. Note that the word `Controller` is removed from `controllerName`. So an example URL would be `url('show_posts')`.

### get

Define a http `get` route.

```js
get(path, ControllerClass, actionName, asName=null)
```

### post

Define a http `post` route.

```js
post(path, ControllerClass, actionName, asName=null)
```

### put

Define a http `put` route.

```js
put(path, ControllerClass, actionName, asName=null)
```

### patch

Define a http `patch` route.

```js
patch(path, ControllerClass, actionName, asName=null)
```

### delete

Define a http `delete` route.

```js
delete(path, ControllerClass, actionName, asName=null)
```

### del

Alias to `delete`.

### Other methods

#### routes

Returns the routes middleware to be used with the Koa app.

```js
// Example
const app = new Koa();
app.use(routeControllers.routes());
```

#### router

This property contains the router instance.

## Controller Class

For every request, a relevant Controller class is automatically instantiated. Then `action` instance method is called.

### Before Action

If the controller class has an instance method `before`, it is called before calling the action method. This is useful, for example, when a controller action must skipped. For this use `this.ctx.throw(400)` in `before`.

### After Action

If the controller class has an instance method `after`, it is called after calling the `action` method.

## Notes

### koa-router

[koa-router](https://github.com/koajs/router) is used for actual routing.

If the `router` instance is needed for additional setup (ex: allowedMethods), it can be accessed using `routeControllersInstance.router`. koa-router API can be found [here](https://github.com/koajs/router/blob/master/API.md).

### Controller Helpers

[Here](examples/blog/app/controllers/base_controller.js) is an example of a base controller that defines `render` helper.

### State

Any properties defined on `this.ctx.state` will be available in views, as defined in [Koa](https://github.com/koajs/koa/blob/master/docs/api/context.md#ctxstate).

### Running the included example

Clone the repo and run -

```
npm start
```
