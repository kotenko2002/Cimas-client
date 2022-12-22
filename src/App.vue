<template>
  <nav-bar/>
  <div class="temp-wrapper">
    <router-view/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import axios from "axios";

export default  {
  name: 'App',
  components: {
    NavBar
  },
  async created() {
    if(localStorage.getItem('token')) {
      const userinfo = await axios.get('user/info');
      this.$store.dispatch('user', userinfo.data);
    }
  }
}
</script>

<style>

  * {
    box-sizing: border-box;
  }

  body{
    background-color: #f5f5f5;
    min-height:  100vh;
    display: flex;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6,label,span {
    font-weight: 500;
  }

  body, html, #app, #root{
    width: 100%;
    height: 100%;
  }

  #app {
    text-align: center;
  }

  .temp-wrapper {
    margin-top: calc(56px + 5%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: left;
  }

  h3 {
    text-align: center;
    margin: 0;
    line-height: 1;
    padding-bottom: 20px;
  }
</style>
