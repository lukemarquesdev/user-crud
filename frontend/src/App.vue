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

  components: {},

  data: () => ({
    drawer: false,
    isLoggedIn: false,
  }),

  methods: {
    async logout() {
      await UserService.logout()
        .then((response) => {
          this.isLoggedIn = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },

  computed: {
    isLoggedIn() {
      return !!localStorage.getItem(import.meta.env.VITE_APP_TOKEN_NAME);
    }
  },
}
</script>

