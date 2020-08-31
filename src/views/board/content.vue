<template>
  <v-container fluid>
    <v-card>
      <v-toolbar color="accent" dense flat dark>
        <v-toolbar-title v-text="info.title"></v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="write"><v-icon>mdi-pencil</v-icon></v-btn>
      </v-toolbar>
      <v-card-text v-if="info.createdAt">
        <v-alert color="info" outlined dismissible>
          <div style="white-space: pre-line">{{ info.description }}</div>
          <div class="text-right font-italic caption">
            작성일:
            {{ info.createdAt.toDate().toLocaleString("ko-KR", this.options) }}
          </div>
          <div class="text-right font-italic caption">
            수정일:
            {{ info.updatedAt.toDate().toLocaleString("ko-KR", this.options) }}
          </div>
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: ["document"],
  data() {
    return {
      unsubscribe: null,
      info: {
        category: "",
        title: "",
        description: "",
        createdAt: "",
        updatedAt: ""
      },
      loading: false,
      options: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }
    };
  },
  watch: {
    document() {
      this.subscribe();
    }
  },
  created() {
    this.subscribe();
  },
  destroyed() {
    if (this.unsubscribe) this.unsubscribe();
  },
  methods: {
    subscribe() {
      if (this.unsubscribe) this.unsubscribe();
      const firestore = this.$firebase.firestore();
      const ref = firestore.collection("boards").doc(this.document);
      this.unsubscribe = ref.onSnapshot(doc => {
        if (!doc.exists) return this.write();
        this.info = doc.data();
      });
    },
    async write() {
      this.$router.push(this.document + "/write");
    }
  }
};
</script>
