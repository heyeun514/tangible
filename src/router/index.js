import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import YourDay from '@/views/YourDay'
import Sound from '@/views/Sound'
import Sound2 from '@/views/Sound2'

Vue.use(VueRouter);

export default new VueRouter({
routes: [
    {path: '/', name: 'home', component: Home},
    {path: '/yourday', name: 'yourDay', component: YourDay},
    {path: '/sound', name: 'sound', component: Sound},
    {path: '/sound2', name: 'sound2', component: Sound2}
    // { path: '/yourday', name: 'yourDay', component:  YourDay}
]});