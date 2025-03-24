import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import pinia from './plugins/pinia'

loadFonts()

const app = createApp(App)
  .use(router)
  .use(vuetify)
  .use(pinia)

// 🔹 Define o estado global ANTES de montar a aplicação
app.config.globalProperties.$isLoading = false;

router.beforeEach((to, from, next) => {
  app.config.globalProperties.$isLoading = true;
  setTimeout(() => next(), 500); // Simula um pequeno delay para o carregamento
});

router.afterEach(() => {
  app.config.globalProperties.$isLoading = false;
});

// 🔹 Agora sim, monta a aplicação
app.mount('#app')