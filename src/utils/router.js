// src/utils/router.js
// Router simple para vistas SPA

export class Router {
  constructor(routes) {
    this.routes = routes;
    window.addEventListener('hashchange', this.handleRoute.bind(this));
    this.handleRoute();
  }

  handleRoute() {
    const path = window.location.hash.replace('#', '') || '/';
    const route = this.routes[path] || this.routes['/404'];
    if (route) route();
  }
}
