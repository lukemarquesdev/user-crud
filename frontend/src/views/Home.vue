<template>
    <v-container class="text-center">
        <v-row justify="center" align="center" class="mt-5">
            <v-col cols="12" md="8">
                <v-card>
                    <v-card-title class="text-h5">Welcome to the Home Page</v-card-title>
                    <v-card-text>
                        This is a simple home page built with Vuetify. Customize it as needed!
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" @click="navigateToAbout">Learn More</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "Home",
    methods: {
        navigateToAbout() {
            this.$router.push({ name: "About" });
        },
    },
};
</script>

<style scoped>
.v-container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>