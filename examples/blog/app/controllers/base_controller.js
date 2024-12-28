/**
 * This is the BaseController that will be inherited by all controllers.
 * 
 * Define common functionality between all controllers here.
 */
class BaseController {
  // Helper function to render `controller/action.html` view
  // View data is set to this, so anything within `this` is accessible in views
  async render() {
    await this.ctx.render(
      `${this.state.controllerName}/${this.state.actionName}`,
      this
    );
  }

  //
  // More helper functions can be implemented here that can be used in actions
  //
}

module.exports = BaseController;
