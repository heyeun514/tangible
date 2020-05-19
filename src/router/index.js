import Vue from 'vue'
import VueRouter from 'vue-router'
import Project from '@/views/Project'
import YourDay from '@/views/YourDay'
import Sound from '@/views/Sound'
import Sound2 from '@/views/Sound2'
import Days from '@/views/Days'

Vue.use(VueRouter);

export default new VueRouter({
routes: [
    {path: '/project', name: 'project', component: Project},
    {path: '/yourday', name: 'yourDay', component: YourDay},
    {path: '/sound', name: 'sound', component: Sound},
    {path: '/sound2', name: 'sound2', component: Sound2},
    {path: '/days', name: 'days', component: Days}
    // { path: '/yourday', name: 'yourDay', component:  YourDay}
]});