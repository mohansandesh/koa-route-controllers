const BaseController = require('./base_controller');
const data = require('../data');

class CommentsController extends BaseController {
  async create() {
    data.comments.push({
      post_id: this.ctx.params.id,
      body: this.ctx.request.body.body
    });
    
    this.ctx.redirect(this.ctx.state.url('show_posts', this.ctx.params.id));
  }
}

module.exports = CommentsController;
