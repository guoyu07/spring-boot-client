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
  import topHeader from '../public-modules/top-header';
  import sideBar from '../public-modules/side-bar';

  export default {
    name: 'Main',
    components: {
      topHeader, sideBar
    }
  }
</script>
