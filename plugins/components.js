import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import {
    Input,
    Button,
    Dialog
} from 'element-ui';
import draggable from 'vuedraggable';

Vue.use(Input);
Vue.use(Button);
Vue.use(Dialog);

Vue.component('draggable', draggable);

