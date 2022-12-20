<template>
  <nav-bar/>
  <div class="auth-wrapper">
    <div class="auth-inner">
      <router-view/>
    </div>
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
    background: #1C8EF9 !important;
    min-height:  100vh;
    display: flex;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6,label,span {
    font-weight: 500;
  }

  body, html, #app, #root, .auth-wrapper{
    width: 100%;
    height: 100%;
  }

  #app {
    text-align: center;
  }

  .navbar-light {
    background: #ffffff;
    box-shadow: 0px 14px 80px rgba(24, 25, 58, 0.2);
  }

  .auth-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: left;
  }

  .auth-inner {
    min-width: 450px;
    margin: auto;
    background: #ffffff;
    box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
    padding: 40px 55px 45px 55px;
    border-radius: 15px;
    transition: all .3s;
  }

  .auth-wrapper .form-control:focus {
    border-color: #167bff;
    box-shadow: none;
  }

  .auth-wrapper h3 {
    text-align: center;
    margin: 0;
    line-height: 1;
    padding-bottom: 20px;
  }

  .custom-control-label {
    font-weight: 400;
  }


</style>
