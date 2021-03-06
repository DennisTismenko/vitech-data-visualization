const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default [
  {
    path: '/',
    name: 'home',
    getComponent(nextState, cb) {
      const importModules = Promise.all([
        import('containers/HomePage'),
      ]);

      const renderRoute = loadModule(cb);

      importModules.then(([component]) => {
        renderRoute(component);
      });

      importModules.catch(errorLoading);
    },
  }, {
    path: '/activities',
    name: 'activities',
    getComponent(nextState, cb) {
      const importModules = Promise.all([
        import('containers/ActivitiesPage'),
      ]);

      const renderRoute = loadModule(cb);

      importModules.then(([component]) => {
        renderRoute(component);
      });

      importModules.catch(errorLoading);
    },
  }, {
    path: '/activities/:id',
    name: 'sepcific-activity',
    getComponent(nextState, cb) {
      const importModules = Promise.all([
        import('containers/ActivitySinglePage'),
      ]);

      const renderRoute = loadModule(cb);

      importModules.then(([component]) => {
        renderRoute(component);
      });

      importModules.catch(errorLoading);
    },
  }, {
    path: '*',
    name: 'notfound',
    getComponent(nextState, cb) {
      import('containers/NotFoundPage')
        .then(loadModule(cb))
        .catch(errorLoading);
    },
  },
];
