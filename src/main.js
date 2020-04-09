import Vue from 'vue';
import App from './App.vue';
import ComponentLibrary from './library';

import './scss/main.scss';

Vue.use(ComponentLibrary);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
