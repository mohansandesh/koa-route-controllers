// RootController is the root class inherited by all controllers in all apps
class RootController {
  async render(){
    console.log({
      path: this.state.routePath,
      appName: this.state.appName,
      pathPrefix: this.state.routerOpts.prefix
    });

    await this.ctx.render(
      `${this.state.appName}/app/views/${this.state.controllerName}/${this.state.actionName}`,
      {
        layout: `main/app/views/layout`
      }
    );
  }
}

module.exports = RootController;
