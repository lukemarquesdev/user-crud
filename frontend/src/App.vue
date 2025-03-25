<template>
  <v-app style="background-color: #F5F5F5">
    <v-app-bar v-if="isLoggedIn" color="primary" dense>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>UserCrud</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-if="isLoggedIn" v-model="drawer" app>
      <v-list>
        <v-list-item-group>
          <v-list-item to="/list-users">
            <v-list-item-title>Lista de usuários</v-list-item-title>
          </v-list-item>
          <v-list-item to="/about">
            <v-list-item-title>Sobre</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import UserService from '@/services/UserService';

export default {
  name: 'App',

  data: () => ({
    drawer: false,
    isLoggedIn: !!localStorage.getItem(import.meta.env.VITE_APP_TOKEN_NAME),
    tokenWatcher: null
  }),

  methods: {
    async logout() {
      await UserService.logout().finally(() => {
        localStorage.removeItem(import.meta.env.VITE_APP_TOKEN_NAME);
        this.isLoggedIn = false;
        this.$router.push({ name: 'login' }).then(() => {
          window.location.reload();
        });
      });
    },
    startTokenWatcher() {
      this.tokenWatcher = setInterval(() => {
        const tokenExists = !!localStorage.getItem(import.meta.env.VITE_APP_TOKEN_NAME);
        if (this.isLoggedIn !== tokenExists) {
          this.isLoggedIn = tokenExists;

          // Se não houver token, redireciona para o login
          if (!this.isLoggedIn) {
            this.$router.push({ name: 'login' }).then(() => {
              window.location.reload();
            });
          }
        }
      }, 1000); // Verifica a cada 1 segundo
    }
  },

  mounted() {
    this.startTokenWatcher();
  },

  beforeUnmount() {
    if (this.tokenWatcher) {
      clearInterval(this.tokenWatcher);
    }
  }
}
</script>

