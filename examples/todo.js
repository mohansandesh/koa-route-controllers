/**
 * 
 * A todo list example
 * 
 * This is an API only app.
 * 
 * URLs:
 * 1. List:     http://localhost:3000/
 * 2. Add:      http://localhost:3000/add?text=New-Item
 * 3. Complete: http://localhost:3000/1/complete
 * 
 * To run: node examples/todo.js
 * 
 */

const items = [
  {
    text: 'Say hello!',
    completed: false
  },
  {
    text: 'Say welcome!',
    completed: false
  },
];

// 
// Controller Class
//
class TodoController{
  async home(){
    this.ctx.body = {
      count: items.length,
      items: items,
      urls: {
        add: this.url('todo_add', {}, { query: {text: 'New-Item' } }),
        complete: this.url('todo_complete', { id: 1 })
      }
    };
  }

  async add(){
    items.push({
      text: this.query.text || 'Empty item',
      completed: false
    });

    this.ctx.body = {
      status: 'success'
    };
  }

  async complete(){
    items[this.params.id].completed = true;

    this.ctx.body = {
      status: 'success'
    };
  }
}


// 
// Koa app
// 
const Koa = require('koa');
const KoaRouteControllers = require('../index');

const routeControllers = new KoaRouteControllers()
.get('/', TodoController, 'home')
.get('/add', TodoController, 'add')
.get('/:id/complete', TodoController, 'complete');

const app = new Koa();
app.use(routeControllers.routes());
app.listen(3000);

console.log('> Example listening on http://localhost:3000');
