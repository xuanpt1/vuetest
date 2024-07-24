import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Antd from 'ant-design-vue';
import 'animate.css';
import 'ant-design-vue/dist/reset.css';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

createApp(App).use(store).use(router).use(Antd).use(mavonEditor)
    .mount('#app')

