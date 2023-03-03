<template>
  <div class="dashboard-container">
    <div class="processing">
      <h3>
        Your data has been processed.
        <br />
        You can choose to preview and download.
      </h3>
      <div class="pro-box">
        <div class="right">
          <div class="group">
            <input v-model="processingForm.projectID" type="text" placeholder="Project ID">
          </div>
          <div class="group">
            <input v-model="processingForm.dataFileID" type="text" placeholder="DataFile ID">
          </div>
        </div>
        <div class="left" style="width: 50%;">

        </div>
      </div>
      <div class="submit">
        <button @click="sendProject">Preview2D</button>
        <button @click="create3D">Preview3D</button>
        <button @click="download">Download</button>
      </div>
      <div>
        <div class="view3D">
          <section>
            <h3>Input</h3>
            <div>
              <canvas id="input_path" height="500" width="100%">
              </canvas>
            </div>
          </section>
          <section>
            <h3>Output</h3>
            <div>
              <canvas id="output_path" height="500" width="100%">
              </canvas>
            </div>
          </section>
        </div>
      </div>

    </div>

    <el-dialog title="Preview" :visible.sync="dialogTableVisible">
      <img width="100%" :src="previewImg" alt="">
    </el-dialog>

  </div>
</template>

<script>
import { filterApi, previewApi, preview3D } from '@/api/user'
import { Niivue } from '@niivue/niivue'
export default {
  name: 'Processing',
  data () {
    return {
      dialog3D: false,
      dialogTableVisible: false,
      previewImg: '',
      processingForm: {
        projectID: "",
        dataFileID: "",
      },
      view3DNum: 0,
      downloadList: []
    }
  },
  methods: {
    sendProject (e) {
      // 检测是否有内容输入
      if (this.processingForm.projectID == '' || this.processingForm.dataFileID == '') {
        this.$message({
          type: 'warning',
          message: 'The content of the input box is required'
        })
        return
      }

      // 响应结果
      filterApi(this.processingForm)
        .then(res => {
          this.$message({
            type: 'success',
            message: 'Success'
          })
          this.sendPreview()
        })
        .catch(err => {
          console.log(err);
        })
    },
    sendPreview () {
      previewApi(this.processingForm)
        .then(res => {
          this.previewImg = 'data:image/png;base64,' + btoa(
            new Uint8Array(res)
              .reduce((data, byte) => data + String.fromCharCode(byte), ''))
        })
        .then(data => {
          this.dialogTableVisible = true
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        })
    },
    async create3D () {
      const res = await preview3D(this.processingForm)
      console.log(res);
      this.downloadList = [res.input_path, res.output_path]
      this.$nextTick(() => {
        this.createNiivue("input_path", this.urlModefi(res.input_path))
        this.createNiivue("output_path", this.urlModefi(res.output_path))
      })
    },
    async download () {
      if (this.downloadList.length == 0) {
        this.$message({
          type: 'warning',
          message: 'The download file path has not been generated'
        })
      }
      let fn = url => {
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";  // 防止影响页面
        iframe.style.height = 0;  // 防止影响页面
        iframe.src = url;
        document.body.appendChild(iframe);  // 这一行必须，iframe挂在到dom树上才会发请求
        // 5分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
        setTimeout(() => {
          iframe.remove();
        }, 5 * 60 * 1000);
      }
      this.downloadList.forEach(ele => {
        fn(ele)
      })


    },
    urlModefi (url) {
      return url.replace('http://127.0.0.1:8000', process.env.VUE_APP_BASE_API)
    },
    createNiivue (elID, url) {
      const nv = new Niivue()
      nv.attachTo(elID)
      nv.loadVolumes([{ url, urlImgData: "nifti.img" }])
      this.view3DNum++
      return nv
    }

  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    padding: 30px;
    width: 800px;
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
  .submit {
    width: 800px;
    display: flex;
    justify-content: space-between;
    button {
      margin-top: 1rem;
      line-height: 1.5;
      // flex: 0 0 48%;
      width: 49%;
    }
  }

  .right {
    width: 49%;
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
    }
  }
}
.view3D {
  display: flex;
  section {
    flex: 1;
    padding: 0 5px;
    // margin: 10px 0;
  }
}
</style>
