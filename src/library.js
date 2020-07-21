import * as components from './components';

const ComponentLibrary = {
  install(Vue) {
    Object.keys(components).forEach((name) => {
      Vue.component(name, components[name]);
    });
  },
};

// Export event bus for cookie notice
export { CookieEvent } from './components/cookie-notice/event';

// Export all components
export default ComponentLibrary;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ComponentLibrary);
}
