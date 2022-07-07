
export default function Router(routes = {}){
  this.routes = routes;
  this.init();
}

Router.prototype = {
  constructor: Router,

  init(){
    this.rootContent = document.querySelector('.content');
    const initialpathName =  window.location.pathname;
    const pathName = initialpathName === '/' ? 'home' : initialpathName.slice(1);
    this.loadRoute(pathName);
  },

  async loadRoute(pathName = 'home'){
    const {path, template} = this.routes[pathName];
    window.history.pushState({},'', path);
    this.rootContent.innerHTML = '';
    const html = await template();
    this.rootContent.appendChild(html);
  }
};

