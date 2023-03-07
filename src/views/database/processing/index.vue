<template>
  <div class="dashboard-container" v-loading="uploadFileLoading">
    <div class="processing">
      <h3>Please Upload your MRI data (nii file) and push the "Start Processing" buttion to start data processing. 
        <br /> We have trained the Gibbs ResUnet with 180 epoches as our default model used here with mean dice loss: 0.6926.
</h3>
      <div class="pro-box">
        <div class="right">
          <div class="group">
            <input v-model="processingForm.projectID" type="text" placeholder="Project ID">
          </div>
          <div class="group">
            <input v-model="processingForm.dataFileID" type="text" placeholder="DataFile ID">
          </div>
          <div class="group">
            <input v-model="processingForm.addTime" type="text" placeholder="Upload Time">
          </div>
          <div class="group">
            <button @click="sendProcessing">Start Processing</button>
          </div>
        </div>
        <div class="left">
          <input @input="updateFile" ref="photo" type="file" accept="nii.gz">
        </div>
      </div>
      <div>
        <canvas id="gl" height="480" width="100%">
        </canvas>
      </div>
    </div>

  </div>
</template>

<script>
import { uploadFile, implement } from '@/api/user'
import { Niivue } from '@niivue/niivue'
import { mapState } from 'vuex'


export default {
  name: 'Processing',
  data () {
    return {
      uploadFileLoading: false,
      processingForm: {
        projectID: "",
        dataFileID: "",
        addTime: "2023-02-20T10:38:00Z",
      },
      volumeList: [

      ],
      imageSrc: ''
    }
  },

  methods: {
    updateFile (e) {
      let photo = this.$refs.photo.files[0]


      if (photo.name.indexOf(".nii") === -1) {
        this.$message({
          type: 'error',
          message: 'Please Upload your MRI data (.nii.zip file) and push the "label" buttion to start data processing.'
        })
        this.$refs.photo.value = ''
        return
      }

      // 检测是否有内容输入
      if (this.processingForm.projectID == '' || this.processingForm.dataFileID == '' || this.processingForm.addTime == '') {
        this.$message({
          type: 'warning',
          message: 'The content of the input box is required'
        })
        return
      }
      // 发送请求
      const formData = new FormData()
      formData.append('projectID', this.processingForm.projectID)
      formData.append('dataFileID', this.processingForm.dataFileID)
      formData.append('addTime', this.processingForm.addTime)
      formData.append('token', this.user.token)
      formData.append('image', photo)
      // 响应结果
      this.uploadFileLoading = true
      uploadFile(formData)
        .then(res => {
          this.$message({
            type: 'success',
            message: 'Success'
          })

          // 本地环境
          // 线上环境
          let url = res.image.indexOf('http://localhost:8000/') != -1 ? res.image.replace('http://localhost:8000/', process.env.VUE_APP_BASE_API) : res.image.replace('http://127.0.0.1:8000', process.env.VUE_APP_BASE_API)
          // let url = res.image.replace('http://127.0.0.1:8000', "http://file-imgai.zuimeng6.cn")
          console.log(url);
          const nv = new Niivue()
          nv.attachTo('gl')
          this.volumeList.push({ url, urlImgData: "nifti.img" })
          nv.loadVolumes(this.volumeList)
          this.uploadFileLoading = false
        })
        .catch(err => {
          this.uploadFileLoading = false
          console.log(err);
        })
    },
    sendProcessing () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      implement({ projectID: this.processingForm.projectID, dataFileID: this.processingForm.dataFileID })
        .then(res => {
          console.log(res);
          loading.close();
          this.$message({
            type: 'success',
            message: res.msg
          })
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    width: 600px;
    margin: 0 auto;
    // height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    h3 {
      margin-bottom: 2rem;
    }
  }
  &-text {
    line-height: 46px;
  }
}
.processing {
  // text-align: center;
  .pro-box {
    display: flex;
    justify-content: space-between;
    // align-items: center;
  }
  .left {
    // flex: 0 0 20%;
    width: 300px;
    height: 200px;
    background: inherit;
    box-sizing: border-box;
    background-color: rgba(242, 242, 242, 1);

    .photo {
      // width: 251px;
      width: 100%;
      height: 173px;
    }
  }
  .right {
    // flex: 0 0 40%;
    width: 260px;
    .group {
      input {
        color: #999999;
        width: 100%;
        // width: 180px;
        line-height: 2;
        padding: 4px 6px;
        margin-bottom: 0.5rem;
        border: 1px solid #ccc;
      }
      button {
        width: 100%;
        margin-top: 1rem;
        line-height: 1.5;
      }
    }
  }
}
</style>
