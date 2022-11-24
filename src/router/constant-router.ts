import About from '@/views/About.vue';
import Home from '@/views/Home.vue';

console.log(About);
console.log(Home);

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
];

export default routes;
