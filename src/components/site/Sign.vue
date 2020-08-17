<template>
  <v-progress-circular indeterminate v-if="loading"></v-progress-circular>
  <v-menu offset-y v-else-if="!$store.state.fireUser">
    <template v-slot:activator="{ on }">
      <v-btn icon>
        <v-icon v-on="on">mdi-account</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>로그인</v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="red" dark @click="singInWithGoogle()" block>
          <v-icon left>mdi-google</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
  <v-menu offset-y v-else>
    <template v-slot:activator="{ on }">
      <v-btn icon>
        <v-avatar size="32" v-on="on">
          <v-img :src="$store.state.fireUser.photoURL"></v-img>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>로그인</v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn dark @click="signOut()" block>로그아웃</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    };
  },
  methods: {
    async singInWithGoogle() {
      // Google 제공업체 객체의 인스턴스를 생성
      const provider = new this.$firebase.auth.GoogleAuthProvider();

      // 인증 제공업체에 요청하고자 하는 OAuth 2.0 범위를 추가로 지정
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

      // this.$firebase.auth().languageCode = "ko";
      // To apply the default browser preference instead of explicitly setting it.
      this.$firebase.auth().useDeviceLanguage();

      this.loading = true;

      try {
        const sn = await this.$firebase.auth().signInWithPopup(provider);
        this.$store.commit("setFireUser", sn.user);
      } finally {
        this.loading = false;
      }
    },
    signOut() {
      this.$firebase.auth().signOut();
    }
  }
};
</script>
