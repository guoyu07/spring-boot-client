<template>
  <div class="user-list">
    <el-tabs v-model="activeName">
      <el-tab-pane label="用户列表" name="first">
        <user-list></user-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import userList from './userList.vue'

  export default {
    name: 'user',
    components: {
      userList
    },
    data() {
      return {
        activeName: 'first'
      }
    },
    created() {
    },
    computed: {},
    methods: {}
  }
</script>

<style scoped>
</style>
