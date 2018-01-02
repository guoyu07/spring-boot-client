<template>
  <div class="user-list">
    <el-tabs v-model="activeName">
      <el-tab-pane label="角色列表" name="first">
        <role-list></role-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import roleList from './roleList.vue'

  export default {
    name: 'user',
    components: {
      roleList
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
