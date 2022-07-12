// My routes
export const routes = {
  home: {
    path: '/',
    template: async () => await (await import('../controllers/home')).default(),
  },

  generate: {
    path: '/generate',
    template: async () => await (await import('../controllers/generate')).default(),
  },

  file: {
    path: '/file',
    template: async () => await (await import('../controllers/file')).default(),
  }
};
