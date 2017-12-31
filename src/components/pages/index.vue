<template>
  <div class="wrapper">
    <top-header></top-header>
    <side-bar></side-bar>
    <div class="content">
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import topHeader from '../global-component/top-header';
  import sideBar from '../global-component/side-bar';

  export default {
    name: 'Main',
    components: {
      topHeader, sideBar
    }
  }
</script>

<style scoped>
  .wrapper{
    background-color: #F4F5F6;
  }
  .wrapper .content {
    background-color: #fff;
    margin: 20px 10px 0px 10px;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,.12);
  }
</style>
