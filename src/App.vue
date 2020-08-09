<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <site-title :title="title" />
      <v-spacer />
      <v-btn icon to="/about">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app absolute temporary v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Application</v-list-item-title>
          <v-list-item-subtitle>subtext</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <site-Menu />
    </v-navigation-drawer>

    <v-content>
      <router-view></router-view>
    </v-content>

    <site-footer :footer="footer" />
  </v-app>
</template>

<script>
import SiteTitle from "@/components/site/Title";
import SiteFooter from "@/components/site/Footer";
import SiteMenu from "@/components/site/Menu";

export default {
  components: { SiteTitle, SiteFooter, SiteMenu },
  name: "App",
  data() {
    return {
      drawer: null,
      items: [],
      title: "Vue+Firebase",
      footer: "kadragon"
    };
  }
};
</script>
