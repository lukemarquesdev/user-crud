<template>
  <v-container>
    <v-row justify="center" class="mt-12">
        <v-col cols="12" md="12">
            <h1 class="text-h3 text-center">Sobre o dev</h1>
            <v-card class="mt-6">
            <v-card-text class="text-h6 text-justify">
                <p>
                    Sou um desenvolvedor pleno com 5 anos de experiência em desenvolvimento web e mobile, atuando com FastAPI, React, Angular, Vue, Node.js, Laravel, Flutter, Kotlin e Docker.
                </p>
                <p>
                    Ele tem experiência em banco de dados PostgreSQL e MySQL. Lucas é apaixonado por tecnologia, otimização de processos e boas práticas de código.
                </p>
                <p>
                    Além disso, ele foi o responsável pelo desenvolvimento de um projeto de gerenciamento de usuários utilizando Vue.js, Vuetify e Laravel como backend.
                </p>
            </v-card-text>
            </v-card>
      </v-col>
      <v-col cols="12" md="12">
        <h1 class="text-h3 text-center">Sobre o Projeto</h1>
        <v-card class="mt-6">
          <v-card-text class="text-h6 text-justify">
            <p>
              Este projeto é um sistema de gerenciamento de usuários desenvolvido com o framework Vue.js e Vuetify para a interface do usuário. 
              Ele permite adicionar, editar e excluir usuários, além de visualizar uma lista completa dos mesmos.
            </p>

            <p>
              As funcionalidades incluem autenticação de usuário, validação de dados e mensagens de feedback via snackbar. 
              O backend foi desenvolvido utilizando o framework Laravel, oferecendo uma API RESTful para garantir uma comunicação eficiente entre o cliente e o servidor.
            </p>

            <p>
              Este projeto foi desenvolvido com o objetivo de demonstrar práticas modernas de desenvolvimento web, utilizando 
              tecnologias como Vue.js, Vuetify, Laravel e integração com serviços backend.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "About",
};
</script>

<style scoped>
.text-h3 {
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 16px;
}
</style>

