<template>
  <div>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="title">Menu</v-list-item-title>
        <v-list-item-subtitle>0.0.1 by K</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list>
      <v-list-group
        v-for="(item, i) in items"
        :key="i"
        v-model="item.active"
        :prepend-icon="item.icon"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn @click="openDialogItem(i)" icon
              ><v-icon>mdi-content-save-edit</v-icon></v-btn
            >
          </v-list-item-action>
        </template>

        <v-list-item
          v-for="(subItem, j) in item.items"
          :key="j"
          :to="subItem.to"
        >
          <v-list-item-content>
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="openDialogSubItem(i, -1)">
          <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>추가하기</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-item @click="openDialogItem(-1)">
        <v-list-item-icon>
          <v-icon>mdi-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>추가하기</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-dialog v-model="dialogItem" max-width="400">
      <v-card>
        <v-card-title>
          수정하기
          <v-spacer />
          <v-btn icon @click="saveItem"
            ><v-icon>mdi-content-save</v-icon></v-btn
          >
          <v-btn @click="dialogItem = false" icon
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="formItem.title"
            label="제목"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="formItem.icon"
            label="icon"
            outlined
            required
            @keydown.enter="saveItem"
          ></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogSubItem" max-width="400">
      <v-card>
        <v-card-title>
          서브 아이템
          <v-spacer />
          <v-btn @click="saveSubItem" icon color=""
            ><v-icon>mdi-content-save</v-icon></v-btn
          >
          <v-btn @click="dialogSubItem = false" icon
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="formSubItem.title"
            label="메뉴 이름"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="formSubItem.to"
            label="경로"
            outlined
            required
            @keydown.enter="saveSubItem"
          ></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["items"],
  data() {
    return {
      dialogItem: false,
      dialogSubItem: false,
      formItem: {
        icon: "",
        title: ""
      },
      formSubItem: {
        title: "",
        to: ""
      },
      selectedItemIndex: -1,
      selectedSubItemIndex: -1
    };
  },
  methods: {
    openDialogItem(index) {
      this.selectedItemIndex = index;

      if (index < 0) {
        this.formItem.title = "";
        this.formItem.icon = "mdi-crosshairs-question";
      } else {
        this.formItem.title = this.items[index].title;
        this.formItem.icon = this.items[index].icon;
      }

      this.dialogItem = true;
    },

    async saveItem() {
      if (this.selectedItemIndex < 0) {
        this.items.push(this.formItem);
      } else {
        this.items[this.selectedItemIndex].title = this.formItem.title;
        this.items[this.selectedItemIndex].icon = this.formItem.icon;
      }
      this.save();
    },
    openDialogSubItem(index, subIndex) {
      this.selectedItemIndex = index;
      this.selectedSubItemIndex = subIndex;
      if (subIndex < 0) {
        this.formSubItem.title = "";
        this.formSubItem.to = "";
      } else {
        this.formSubItem.title = this.items[index].item[subIndex].title;
        this.formSubItem.icon = this.items[index].item[subIndex].icon;
      }
      this.dialogSubItem = true;
    },
    async saveSubItem() {
      if (this.selectedSubItemIndex < 0) {
        if (!this.items[this.selectedItemIndex].items)
          this.items[this.selectedItemIndex].items = [];
        this.items[this.selectedItemIndex].items.push({
          title: this.formSubItem.title,
          to: this.formSubItem.to
        });
      } else {
        this.items[this.selectedItemIndex].items[
          this.selectedSubItemIndex
        ].title = this.formSubItem.title;
        this.items[this.selectedItemIndex].items[
          this.selectedSubItemIndex
        ].to = this.formSubItem.to;
      }
      this.save();
    },
    async save() {
      try {
        await this.$firebase
          .database()
          .ref()
          .child("site")
          .child("menu")
          .set(this.items);
      } finally {
        this.dialogItem = false;
        this.dialogSubItem = false;
      }
    }
  }
};
</script>
