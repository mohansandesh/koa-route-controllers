// 
// sub-app-2
//
// 

const RootController = require('../../../lib/root_controller');

// 
// Controller Class
//
class HelloController extends RootController {
  async home() {
    await this.render();
  }

  async about() {
    await this.render();
  }
}

module.exports = HelloController;
