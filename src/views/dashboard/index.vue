<template>
  <div class="dashboard-container">
    <div class="section-title mb-40 both-border text-center"><span class="title-tag">Welcome, {{user.name}}!</span>
      <h2 class="title">In this website, you can explore some valuable features...</h2>
    </div>
    <div class="informations">
      <el-row :gutter="12" type="flex" class="row">
        <el-col :span="24" class="center-box">
          <el-card class="card border1" shadow="never">
            <div class="item">
              <div class="left">
                <div><img src="../../assets/welcome/4.png" alt=""></div>
              </div>
              <div class="right" style="width: 80%;">
                <div>
                  Seeing your NIfTI imagess in 3D is simple! You can view the MRI brain
                  data and also the segmenting results clearly in 3D.
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12" class="border2">
          <el-card class="card" shadow="never">
            <div class="item">
              <div class="left">
                <div><img src="../../assets/welcome/1.png" alt=""></div>
              </div>
              <div class="right">
                <div>
                  To do your segmentation, you may use the pretrained Gibbs ResUnet model we
                  provided. Interested in learning more about Gibbs ResUnet? <a href="https://github.com/yanielc/Gibbs_ResUnet">Click this!</a>
                </div>
              </div>
            </div>
          </el-card>
          <el-card class="card" shadow="never">
            <div class="item">
              <div class="left">
                <div><img src="../../assets/welcome/3.png" alt=""></div>
              </div>
              <div class="right">
                <div>
                  Want to better organise and manage your projects? Here, you may
                  develop your own projects.
                </div>
              </div>
            </div>
          </el-card>
    

        </el-col>
     
        <el-col :span="12" class="border3">
          <el-card class="card" shadow="never">
            <div class="item">
              <div class="left">
                <div><img src="../../assets/welcome/2.png" alt=""></div>
              </div>
              <div class="right">
                <div>
                  Want easy collaboration and streamlined communication? Here, you can
                  create and manage your own teams.
                </div>
              </div>
            </div>
          </el-card>
      
          <el-card class="card" shadow="never">
            <div class="item">
              <div class="left">
                <div><img src="../../assets/welcome/5.png" alt=""></div>
              </div>
              <div class="right">
                <div>
                  Here is more... You can also train your own models and use tensorboard to visualise your train loss.
                </div>
              </div>
            </div>
          </el-card>
        
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Dashboard',
  created () {
    console.log(this.user);
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.row {
  flex-wrap: wrap;
}
.card {
  margin-bottom: 10px;
  border-width: 2px;
}
.border1{
  border-color: #0b77e6;
  .left{
    // flex: 0 0 18%;
    width: 138px !important;
  }
}
.border2 .card:nth-of-type(1),
.border3 .card:nth-of-type(1){
  border-color: #60a5e9;
}
.border2 .card:nth-of-type(2),
.border3 .card:nth-of-type(2){
  border-color: #88c1f9b0;
} 
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.dashboard {
  &-container {
    margin: 30px;
    width: 100%;
    margin: 0 auto;
    // background: #f0f4f9;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.section-title {
  padding-top: 20px;
  text-align: center;
  .title {
    font-size: 30px;
    line-height: 1.1;
  }
}
.section-title .title-tag {
  font-size: 20px;
  font-weight: 700;
  color: #409eff;
  display: inline-block;
  position: relative;
  margin-bottom: 15px;
}

.section-title .title-tag::before,
.section-title .title-tag::after {
  position: absolute;
  left: 0;
  width: 30px;
  height: 3px;
  background-color: #409eff;
  content: '';
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  display: none;
}

.section-title .title-tag::after {
  left: auto;
  right: 0;
}

.section-title.left-border .title-tag {
  padding-left: 45px;
}

.section-title.left-border .title-tag::before {
  display: block;
}

.section-title.both-border .title-tag {
  padding: 0 45px;
}

.section-title.both-border .title-tag::before,
.section-title.both-border .title-tag::after {
  display: block;
}
.informations {
  width: 80%;
  margin: 40px auto;
  // background: #f0f4f9;
  padding: 10px;
}
.item {
  display: flex;
  flex-wrap: wrap;
  // align-items: center;
  // flex-direction: column;
  &:hover .left::after {
    width: 100%;
  }
  .left {
    width: 130px;
    // flex: 0 0 20%;
    height: 110px;
    // flex: 0 0 10%;
    padding: 10px;
    position: relative;

    &::after {
      content: '';
      transition: 0.33s ease;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 50%;
      height: 1px;
      background: #409eff;
    }
    & > div {
      width: 100%;
      height: 100%;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .right {
    width: 70%;
    padding-top: 20px;
    line-height: 1.5;
    & > div {
      height: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    a {
      color: #409eff;
    }
  }
}
</style>
