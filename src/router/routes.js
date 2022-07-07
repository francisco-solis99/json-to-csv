// My routes
export const routes = {
  home: {
    path: '/',
    template: async () => await (await import('../controllers/home')).default(),
  }
};
