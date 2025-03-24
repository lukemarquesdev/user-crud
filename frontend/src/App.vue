<template>
  <v-app>
    <Loading />
    <!-- Barra de Navegação Superior -->
    <v-app-bar color="primary" dense>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Meu App</v-toolbar-title>
    </v-app-bar>

    <!-- Sidebar (Navigation Drawer) -->
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item-group>
          <v-list-item to="/home">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item to="/list-users">
            <v-list-item-title>Lista de usuários</v-list-item-title>
          </v-list-item>
          <v-list-item to="/about">
            <v-list-item-title>Sobre</v-list-item-title>
          </v-list-item>
          <v-list-item to="/settings">
            <v-list-item-title>Configurações</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Conteúdo Principal -->
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Loading from './components/Loading.vue';

export default {
  name: 'App',

  components: {
    Loading, // 🔹 Agora está registrado corretamente
  },

  data: () => ({
    drawer: false,
  }),
}
</script>
