// My routes

/**
 * Routes Object
 * @property {Object} home - Save the home path and it's template
 * @property {Object} generate - Save the generate path and it's template
 * @property {Object} file - Save the file path and it's template
 */
export const routes = {
  /**
   * Route
   * @typedef {Object} route
   * @property {String} path route path
   * @property {Function} template get the route template as a HTML ELEMENT
   */

  /**
   * @type {route}
   */
  home: {
    path: '/',
    template: async () => await (await import('../controllers/home')).default(),
  },

  /**
   * @type {route}
  */
  generate: {
    path: '/generate',
    template: async () => await (await import('../controllers/generate')).default(),
  },

  /**
   * @type {route}
  */
  file: {
    path: '/file',
    template: async () => await (await import('../controllers/file')).default(),
  }
};
