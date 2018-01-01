<template>
  <div class="workbench">
    <div class="workbench-top">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">

            <!--<div>-->
            <!--<i class="el-icon-upload2"></i> 用户增长数-->
            <!--</div>-->
            <!--<div class="">-->
            <!--<count-to class="card-panel-num" :startVal="0" :endVal="81212" :duration="3000"></count-to>-->
            <!--</div>-->

            <div class="card-panel-icon-wrapper icon-user">
              <i class="el-icon-upload2" style="size: 20px"></i>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">用户数</div>
              <count-to class="card-panel-num" :startVal="0" :endVal="81212" :duration="3000"></count-to>
            </div>

          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">

            <div class="card-panel-icon-wrapper icon-user-num">
              <i class="el-icon-view"></i>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">用户指数</div>
              <count-to class="card-panel-num" :startVal="0" :endVal="565" :duration="3000"></count-to>
            </div>

          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">

            <div class="card-panel-icon-wrapper icon-star">
              <i class="el-icon-star-on"></i>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">累计收藏</div>
              <count-to class="card-panel-num" :startVal="0" :endVal="232671" :duration="3000"></count-to>
            </div>

          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div class="grid-content">

              <div class="card-panel-icon-wrapper icon-share">
                <i class="el-icon-share"></i>
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">累计分享</div>
                <count-to class="card-panel-num" :startVal="0" :endVal="132672" :duration="3000"></count-to>
              </div>

            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="workbench-content">
      <el-tabs v-model="activeName">

        <el-tab-pane label="概况" name="first">
          <div class="tab-content overview-analysis">
            概况
          </div>
        </el-tab-pane>

        <el-tab-pane label="用户分析" name="second">
          <div class="tab-content user-analysis">
            用户分析
          </div>
        </el-tab-pane>

        <el-tab-pane label="文章分析" name="fouth">
          <div class="tab-content content-analysis">
            文章分析
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>
  </div>
</template>

<script>
  import CountTo from 'vue-count-to'

  export default {
    components: {
      CountTo
    },
    data: function () {
      return {
        activeName: 'first'
      }
    }
  }
</script>

<style scoped>
  .workbench {
    background-color: #F4F5F6;
  }

  .workbench-content {
    background-color: #fff;
  }

  .workbench-top {
    width: 100%;
    margin-bottom: 20px;
    background-color: #F4F5F6;
  }

  .workbench-top el-col {
    margin: 10px;
  }
  .icon-user{
    color: #40C9C6;
  }
  .icon-user-num{
    color: #36A3F7;
  }
  .icon-star{
    color: #f7ba2a;
  }
  .icon-share{
    color: #e64242;
  }
  .card-panel-icon-wrapper {
    font-size: 25px;
    position: absolute;
    top: 50%;
    left: 30%;
    transform: translateY(-50%);
  }

  .card-panel-description{
    font-size: 20px;
    position: absolute;
    top: 50%;
    right: 25%;
    transform: translateY(-50%);
  }
  .workbench-top .grid-content {
    position: relative;
    text-align: center;
    font-size: 18px;
    height: 120px;
    background-color: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .12);
  }
  .tab-content{
    margin: 0px 10px 0px 10px;
  }
</style>
