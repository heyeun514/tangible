import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import YourDay from '@/views/YourDay'

Vue.use(VueRouter);

export default new VueRouter({
routes: [
    { path: '/', name: 'home', component:  Home},
    { path: '/yourday', name: 'yourDay', component:  YourDay}
    // { path: '/yourday', name: 'yourDay', component:  YourDay}
]});