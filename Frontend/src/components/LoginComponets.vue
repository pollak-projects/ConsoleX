<template>
  <v-container>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>My App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>Home</v-btn>
      <v-btn text>Gaming</v-btn>
      <v-btn text>Office</v-btn>
      <v-btn text>Checkout</v-btn>
      <v-btn text>Contacts</v-btn>
      <v-text-field
        dense
        solo
        placeholder="Search..."
        prepend-inner-icon="mdi-magnify"
        class="searchbar"
      ></v-text-field>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
.searchbar {
  max-width: 200px;
}
</style>
