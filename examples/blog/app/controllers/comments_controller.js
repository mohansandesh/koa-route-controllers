const BaseController = require('./base_controller');
const store = require('../store');

class CommentsController extends BaseController {
  async create() {
    store.comments.push({
      post_id: this.ctx.params.id,
      body: this.ctx.request.body.body
    });
    
    this.ctx.redirect(this.ctx.state.url('posts_show', this.ctx.params.id));
  }
}

module.exports = CommentsController;
