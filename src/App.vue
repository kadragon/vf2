<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <site-title :title="site.title" />
      <v-spacer />
      <site-sign></site-sign>
    </v-app-bar>

    <v-navigation-drawer app absolute temporary v-model="drawer" width="400">
      <site-Menu :items="site.menu" />
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>

    <site-footer :footer="site.footer" />
  </v-app>
</template>

<script>
import SiteTitle from "@/components/site/Title";
import SiteFooter from "@/components/site/Footer";
import SiteMenu from "@/components/site/Menu";
import SiteSign from "@/components/site/Sign";

export default {
  components: { SiteTitle, SiteFooter, SiteMenu, SiteSign },
  name: "App",
  data() {
    return {
      drawer: null,
      site: {}
    };
  },
  created() {
    this.subscribe();
  },
  mounted() {},
  methods: {
    subscribe() {
      this.$firebase
        .database()
        .ref()
        .child("site")
        .on(
          "value",
          sn => {
            const v = sn.val();
            if (!v) {
              this.$firebase
                .database()
                .ref()
                .child("site")
                .set(this.site);
              return;
            }
            this.site = v;
          },
          e => {
            console.log(e.message);
          }
        );
    }
  }
};
</script>
