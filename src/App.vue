<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <site-title :title="site.title" />
      <v-spacer />
      <v-btn icon @click="save">
        <v-icon>mdi-check</v-icon>
      </v-btn>
      <v-btn icon @click="read">
        <v-icon>mdi-numeric</v-icon>
      </v-btn>
      <v-btn icon @click="readOne">
        <v-icon>mdi-ab-testing</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app absolute temporary v-model="drawer">
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

export default {
  components: { SiteTitle, SiteFooter, SiteMenu },
  name: "App",
  data() {
    return {
      drawer: null,
      site: {
        menu: [],
        title: "Vue+Firebase",
        footer: "kadragon"
      }
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
            }
            this.site = v;
          },
          e => {
            console.log(e.message);
          }
        );
    },
    save() {
      this.$firebase
        .database()
        .ref()
        .child("abcd")
        .set({
          title: "abcd",
          text: "ttttt"
        });
    },
    read() {
      this.$firebase
        .database()
        .ref()
        .child("abcd")
        .on("value", sn => {
          console.log(sn);
          console.log(sn.val());
        });
    },
    async readOne() {
      const sn = await this.$firebase
        .database()
        .ref()
        .child("abcd")
        .once("value");
      console.log(sn.val());
    }
  }
};
</script>
