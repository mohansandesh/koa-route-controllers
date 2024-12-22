const BaseController = require('./base_controller');
const store = require('../store');

class PostsController extends BaseController {
  // Before action that will be executed before every action.
  // Throw (this.ctx.throw(4xx)) to stop execution.
  // If you have before action in base controller, make sure you call super here.
  async before() {
    if(['show'].includes(this.ctx.state.actionName)){
      this.#setPost();
    }
  }

  async home() {
    this.posts = store.posts;

    await this.render();
  }

  async show() {
    this.comments = store.comments.filter((post)=>post.post_id == this.ctx.params.id);

    await this.render();
  }

  async new() {
    await this.render();
  }

  async create() {
    const new_id = store.posts[store.posts.length-1].id + 1;

    store.posts.push({
      id: new_id,
      title: this.ctx.request.body.title,
      body: this.ctx.request.body.body
    });
    
    this.ctx.redirect(this.ctx.state.url('posts_home'));
  }

  // 
  // Private methods
  // 
  #setPost() {
    this.post = store.posts.find((post)=>post.id == this.ctx.params.id);

    if(!this.post){
      this.ctx.throw(404, 'Post not found!');
    }
  }
}

module.exports = PostsController;
