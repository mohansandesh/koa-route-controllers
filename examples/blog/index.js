const Koa = require('koa');
const render = require("@koa/ejs");
const { koaBody } = require('koa-body');
const KoaRouteControllers = require('../../index');

// Import controllers
const PostsController = require('./app/controllers/posts_controller');
const CommentsController = require('./app/controllers/comments_controller');

// 
// Routes Start
// 

const routeControllers = new KoaRouteControllers()

// Posts routes
.get('/', PostsController, 'home')
.get('/posts/new', PostsController, 'new')
.post('/posts/create', PostsController, 'create')
.get('/posts/:id', PostsController, 'show')

// Comments routes
.post('/posts/:id/comments', CommentsController, 'create');

// 
// Routes END
// 

// Create Koa app
const app = new Koa();
app.use(koaBody());
app.use(routeControllers.routes());
render(app, {
  root: __dirname + '/app/views'
});
app.listen(3000);

console.log('> Blog example listening on http://localhost:3000');
