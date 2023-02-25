import { createApp } from 'vue';
import TDesign from 'tdesign-vue-next';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';

// 引入组件库全局样式资源
import 'tdesign-vue-next/es/style/index.css';

// Make BootstrapVue available throughout your project
// Optionally install the BootstrapVue icon components plugin
createApp(App).use(store).use(router).use(TDesign)
  .use(VueAxios, axios)
  .mount('#app');
