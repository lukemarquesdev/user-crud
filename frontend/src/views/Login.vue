<template>
    <v-row no-gutters="" class="login-container">
        <v-row no-gutters>
            <v-col cols="4" md="4" class="d-flex align-center justify-center">
                <v-row class="login-form d-flex align-center justify-center">
                    <p class="welcome-text text-h4 text-center">Bem-vindo ao UserCrud</p>
                    <v-card class="card-container">
                        <v-card-title class="text-h6 text-center text-wrap">Informe seus dados de acesso para acessar o sistema</v-card-title>
                        <v-card-text class="form-distance">
                            <v-form @submit.prevent="handleLogin" ref="form">
                                <v-text-field
                                    v-model="email"
                                    label="E-mail"
                                    type="email"
                                    required
                                    outlined
                                ></v-text-field>
                                <v-text-field
                                    v-model="password"
                                    :type="showPassword ? 'text' : 'password'"
                                    label="Senha"
                                    required
                                    outlined
                                >
                                    <template #append-inner>
                                        <v-icon @click="togglePasswordVisibility">
                                            {{ !showPassword ? 'mdi-eye' : 'mdi-eye-off' }}
                                        </v-icon>
                                    </template>
                                </v-text-field>
                                <v-btn
                                    type="submit"
                                    color="primary"
                                    block
                                    class="mt-4"
                                >
                                    Login
                                </v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-row>
            </v-col>
            <v-col cols="8" md="8" class="d-flex align-center justify-center h-full">
                <img src="@/assets/banner.webp" height="100%" width="100%" alt="Logo" />
            </v-col>
        </v-row>
    </v-row>
</template>

<script>
import AuthService from "@/services/AuthService";

const TOKEN_NAME = import.meta.env.VITE_APP_TOKEN_NAME;

export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
            showPassword: false,
        };
    },
    methods: {
        async handleLogin() {
            await AuthService.login({email: this.email, password: this.password})
                .then((response) => {
                    localStorage.setItem(TOKEN_NAME, response.data.token)
                    this.$router.push({ name: "list-users" });
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
    },
};
</script>

<style scoped>
.login-container {
   height: 100vh;
   width: 100vw;
}
.login-form {
    background-color: #F5F5F5;
    height: 100%;
    width: 100%;
    margin: 0 auto;
}
.card-container {
    height: 50%;
    width: 80%;
}
.form-distance {
    margin-top: 50px;
}
</style>

