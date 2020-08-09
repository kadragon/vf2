<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">Application</v-list-item-title>
        <v-list-item-subtitle>subtext</v-list-item-subtitle>
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
        </template>

        <v-list-item
          v-for="subItem in item.items"
          :key="subItem.title"
          :to="subItem.to"
        >
          <v-list-item-content>
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "HOME",
          icon: "mdi-home",
          items: [
            {
              title: "Dashboard",
              to: "/"
            },
            {
              title: "About",
              to: "/about"
            }
          ]
        },
        {
          title: "About",
          icon: "mdi-account",
          active: true,
          items: [
            {
              title: "About",
              to: "/About"
            }
          ]
        }
      ]
    };
  }
};
</script>
