<template>
    <v-container class="d-flex flex-column align-center justify-center text-center" style="height: 100vh;">
        <v-icon size="128" color="primary">mdi-alert-circle-outline</v-icon>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <v-btn color="primary" @click="goHome">Go to Home</v-btn>
    </v-container>
</template>

<script>
export default {
    name: "NotFound",
    methods: {
        goHome() {
            this.$router.push("/");
        },
    },
};
</script>

<style scoped>
h1 {
    font-size: 2.5rem;
    margin: 16px 0;
}
p {
    font-size: 1.2rem;
    margin-bottom: 24px;
}
</style>