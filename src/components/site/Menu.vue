<template>
  <v-list dense nav>
    <v-list-item v-for="item in items" :key="item.title" :to="item.to">
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", to: "/" },
        { title: "Photos", icon: "mdi-image", to: "/about" },
        { title: "About", icon: "mdi-help-box", to: "/" }
      ]
    };
  }
};
</script>
