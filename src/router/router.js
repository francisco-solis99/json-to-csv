/**
 * Represents a Router to load a route
 * @class
 * @constructor
 * @param {Object} routes - The routes of the app
 * @example
 * const myRouter = new Router(routes);
 */
function Router(routes = {}){
  this.routes = routes;
}

Router.prototype = /** @lends Router.prototype */ {
  constructor: Router,

  /**
   * Init the router to get the current path and load the cooresponding view
   * @return {void}
   */
  init(){
    this.rootContent = document.querySelector('.content');
    const initialpathName =  window.location.pathname;
    const pathName = initialpathName === '/' || initialpathName === '/json-to-csv/' ? 'home' : initialpathName.slice(1);
    console.log(pathName);
    this.loadRoute(pathName);
  },

  /**
   * Load the corresponding view according to the pathName given
   * @async
   * @param {route} pathName The name of the path to load
   * @return {void}
   */
  async loadRoute(pathName = 'home'){
    console.log(pathName);
    const {path, template} = this.routes[pathName];
    window.history.pushState({},'', path);
    this.rootContent.innerHTML = '';
    const html = await template();
    this.rootContent.appendChild(html);
  }
};

export default Router;
