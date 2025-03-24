<template>
    <v-container class="login-container" max-width="400">
        <v-card>
            <v-card-title class="text-h5 text-center">Login</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="handleLogin" ref="form">
                    <v-text-field
                        v-model="email"
                        label="Email"
                        type="email"
                        required
                        outlined
                    ></v-text-field>
                    <v-text-field
                        v-model="password"
                        label="Password"
                        type="password"
                        required
                        outlined
                    ></v-text-field>
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
    </v-container>
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
        };
    },
    methods: {
        async handleLogin() {
            await AuthService.login({email: this.email, password: this.password})
                .then((response) => {
                    localStorage.setItem(TOKEN_NAME, response.data.token)
                    this.$router.push({ name: "home" });
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
};
</script>

<style scoped>
.login-container {
    margin: 50px auto;
}
</style>
