/**
 * An example of a main app, which has two sub apps, sub-app-1 and sub-app-2.
 * 
 * To run: node examples/sub-apps
 */

// 
// Koa app
// 
const Koa = require('koa');
const render = require("@koa/ejs");

// Import main app
const main_app = require('./main/routes');

// Import sub-apps
const sub_app_1 = require('./sub-app-1/routes');
const sub_app_2 = require('./sub-app-2/routes');

const app = new Koa();

// Use main app
app.use(main_app());

// Use sub-app1, with path /sub_app_1
app.use(sub_app_1('/sub-app-1'));

// Use sub-app2, with path /sub_app_2
app.use(sub_app_2('/sub-app-2'));

// Set views path to root
render(app, {
  root: __dirname
});

app.listen(3000);

console.log('> Example listening on http://localhost:3000');
