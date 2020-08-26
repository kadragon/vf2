<template>
  <v-card>
    <v-card-title>BOARD Test</v-card-title>

    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      :options.sync="options"
      :server-items-length="serverItemsLength"
    >
      <template v-slot:item.id="{ item }">
        <v-btn icon @click="openDialog(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="remove(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
      <template v-slot:item.createdAt="{ item }">{{
        item.createdAt.toLocaleString()
      }}</template>
    </v-data-table>

    <v-card-actions>
      <v-btn @click="read">
        <v-icon left>mdi-read</v-icon>
      </v-btn>
      <v-btn @click="openDialog(null)">
        <v-icon left>mdi-pencil</v-icon>
      </v-btn>
    </v-card-actions>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-form>
          <v-card-text>
            <v-text-field v-model="form.title"></v-text-field>
            <v-text-field v-model="form.content"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="update" v-if="selectedItem">save</v-btn>
            <v-btn @click="add" v-else>save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { head, last } from "lodash";

export default {
  data() {
    return {
      headers: [
        { value: "createdAt", text: "작성시간" },
        { value: "title", text: "제목" },
        { value: "content", text: "내용" },
        { value: "id", text: "" }
      ],
      items: [],
      form: {
        title: "",
        content: ""
      },
      dialog: false,
      selectedItem: null,
      unsubscribe: null,
      unsubscribeCount: null,
      options: {},
      serverItemsLength: 0,
      docs: []
    };
  },
  watch: {
    options: {
      handler(n, o) {
        console.log(o);
        console.log(n);
        this.subscribe();
      },
      deep: true
    }
  },
  created() {
    // this.read();
    // this.subscribe();
  },
  destroyed() {
    if (this.unsubscribe) this.unsubscribe();
    if (this.unsubscribeCount) this.unsubscribeCount();
  },
  methods: {
    subscribe() {
      this.unsubscribeCount = this.$firebase
        .firestore()
        .collection("meta")
        .doc("boards")
        .onSnapshot(doc => {
          if (!doc.exists) return;
          this.serverItemsLength = doc.data().count;
        });

      this.unsubscribe = this.$firebase
        .firestore()
        .collection("boards")
        .limit(this.options.itemsPerPage)
        .onSnapshot(sn => {
          if (sn.empty) {
            this.items = [];
            return;
          }
          this.docs = sn.docs;
          console.log(head(sn.docs).data());
          console.log(last(sn.docs).data());

          this.items = this.docs.map(v => {
            const item = v.data();
            return {
              id: v.id,
              title: item.title,
              content: item.content,
              createdAt: item.createdAt.toDate()
            };
          });
        });
    },
    openDialog(item) {
      this.selectedItem = item;
      this.dialog = true;
      if (!item) {
        (this.form.title = ""), (this.form.content = "");
      } else {
        (this.form.title = item.title), (this.form.content = item.content);
      }
    },
    add() {
      const item = {};
      Object.assign(item, this.form);
      item.createdAt = new Date();
      this.$firebase
        .firestore()
        .collection("boards")
        .add(item);
      this.dialog = false;
    },
    update() {
      this.$firebase
        .firestore()
        .collection("boards")
        .doc(this.selectedItem.id)
        .update(this.form);
      this.dialog = false;
    },
    async read() {
      const sn = await this.$firebase
        .firestore()
        .collection("boards")
        .get();

      this.items = sn.docs.map(v => {
        const item = v.data();
        return {
          id: v.id,
          title: item.title,
          content: item.content
        };
      });
    },
    remove(item) {
      this.$firebase
        .firestore()
        .collection("boards")
        .doc(item.id)
        .delete();
    }
  }
};
</script>
