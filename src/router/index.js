/* -- src\router\index.js -- */
import { createMemoryHistory, createRouter } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import SetlistView from '@/views/SetlistView.vue';
import TransportView from '@/views/TransportView.vue';
import MetronomeView from '@/views/MetronomeView.vue';
import PlayerView from '@/views/PlayerView.vue';
import OptionsView from '@/views/OptionsView.vue';
import AboutView from '@/views/AboutView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/setlist', name: 'Setlist', component: SetlistView },
  { path: '/transport', name: 'Transport', component: TransportView },
  { path: '/metronome', name: 'Metronome', component: MetronomeView },
  { path: '/player', name: 'Player', component: PlayerView },
  { path: '/options', name: 'Options', component: OptionsView },
  { path: '/about', name: 'About', component: AboutView },
];

export const router = createRouter({
  //	base: import.meta.env.BASE_URL,
  history: createMemoryHistory(),
  routes,
});
