<template>
  <v-overlay :model-value="loading" class="d-flex justify-center align-center">
    <v-progress-circular indeterminate size="50" color="primary"></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$root.$isLoading; // Obtém o estado global do loading
    }
  }
}
</script>
