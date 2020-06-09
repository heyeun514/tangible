import Vue from 'vue'
import VueRouter from 'vue-router'
import Project from '@/views/Project'
import YourDay from '@/views/YourDay'
import Sound from '@/views/Sound'
import Sound2 from '@/views/Sound2'
import Days from '@/views/Days'
import Emotions from '@/views/Emotions'
import Fractal from '@/views/Fractal'
import Text from '@/views/Text'
import Thanos from '@/views/Thanos'

Vue.use(VueRouter);

export default new VueRouter({
routes: [
    {path: '/project', name: 'project', component: Project},
    {path: '/yourday', name: 'yourDay', component: YourDay},
    {path: '/sound', name: 'sound', component: Sound},
    {path: '/sound2', name: 'sound2', component: Sound2},
    {path: '/days', name: 'days', component: Days},
    {path: '/emotions', name: 'emotions', component: Emotions, props: true},
    {path: '/fractal', name: 'fractal', component: Fractal, props: true},
    {path: '/text', name: 'text', component: Text, props: true},
    {path: '/thanos', name: 'thanos', componsnt: Thanos, props: true}
    // { path: '/yourday', name: 'yourDay', component:  YourDay}
]});