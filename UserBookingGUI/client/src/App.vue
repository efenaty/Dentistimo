<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  data() {
    return {
      userId:''
    }
  },
   mounted() {
  },
  components: {},
  methods: {
    send(){
     /* console.log(this.userId) */
    },
    CreateCookieId(name, value, days) {
      var date, expires;
      if (days) {
        date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      } else {
        expires = "";
      }
      document.cookie = name + "=" + value + expires + "; path=/";
      this.userId = value
      return this.userId
    }
  }
};
</script>

<style>
html {
  scroll-behavior: smooth;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}

body {
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  background-color: #fefefa !important;
}
#app {
  font-family: "Poppins";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
