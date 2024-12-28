const BaseController = require('./base_controller');
const store = require('../store');

class CommentsController extends BaseController {
  async create() {
    store.comments.push({
      post_id: this.params.id,
      body: this.ctx.request.body.body
    });
    
    this.ctx.redirect(this.url('posts_show', this.params.id));
  }
}

module.exports = CommentsController;
