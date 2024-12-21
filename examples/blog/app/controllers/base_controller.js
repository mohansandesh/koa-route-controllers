class BaseController {
  // Helper function to automatically render `controller/action.html` view
  // View data is set to this, so anything within `this` is accessible in views
  async render() {
    await this.ctx.render(
      `${this.ctx.state.controllerName}/${this.ctx.state.actionName}`,
      this
    );
  }

  //
  // More helper functions can be implemented here that can be used in actions
  //
}

module.exports = BaseController;
