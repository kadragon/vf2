<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon to="/about">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer app color="primary" dark absolute="true">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>
