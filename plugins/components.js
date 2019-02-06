import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import {
    Input,
    Button
} from 'element-ui';
import draggable from 'vuedraggable';

Vue.use(Input);
Vue.use(Button);

Vue.component('draggable', draggable);

