<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item @click.native="turnTo('outline')"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>我要发布</el-breadcrumb-item>
      <el-breadcrumb-item>发布周边</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="addCard" shadow="always">
      <div class="note">请填写您将要发布的周边的相关信息噢！</div>
      <el-form
        :model="goodsForm"
        :rules="rules"
        ref="goodsForm"
        label-width="120px"
        label-position="left"
        class="demo-goodsForm"
      >
        <el-form-item label="对应的演出ID" prop="showId">
          <el-input
            v-model="goodsForm.showId"
            placeholder="请输入对应的演出ID"
          ></el-input>
        </el-form-item>

        <el-form-item label="周边名称" prop="goodsName">
          <el-input
            v-model="goodsForm.goodsName"
            placeholder="请输周边名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="价格（RMB）" prop="price">
          <el-input-number
            v-model="goodsForm.price"
            controls-position="right"
            :min="0"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="数量" prop="available">
          <el-input-number
            v-model="goodsForm.available"
            controls-position="right"
            :min="1"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="上传实物图" prop="goodsPhoto">
          <el-upload action="#" list-type="picture-card" :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
              </span>
            </div>
          </el-upload>
        </el-form-item>
</el-form>
       <div class="button">
          <el-button type="primary" @click="confirmForm('goodsForm')"
            >立即发布</el-button
          >
          <el-button @click="resetForm('goodsForm')">重置</el-button>
       </div>
      
    </el-card>

    <!-- 发布成功的对话框 -->
    <el-dialog title="系统提示" :visible.sync="successVisible" width="300px">
      <span>发布周边成功</span>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="bothRemove">继续发布</el-button>
        <el-button type="primary" @click="turnTo('outline')">
          返回首页
        </el-button>
      </span>
    </el-dialog>

    <!-- 更改确认信息的对话框 -->
    <el-dialog title="确认信息" :visible.sync="confirmVisible" width="500px">
      <div>
        您将要发布一个周边，信息如下：
        <el-card class="confirm-card">
          <el-row>商家ID:{{ goodsForm.sellerId }}</el-row>
          <el-row>演出ID:{{ goodsForm.showId }}</el-row>
          <el-row>周边名称:{{ goodsForm.goodsName }}</el-row>
          <el-row>周边价格:{{ goodsForm.price }}</el-row>
          <el-row>周边数量:{{ goodsForm.available }}</el-row>
        </el-card>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="confirmVisible = false">取 消</el-button>
        <el-button type="primary" @click="Release">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  goodsName: "ReleaseSlot",
  props: {
    msg: String,
  },
  data() {
    return {
      goodsForm: {
        sellerId: this.$route.params.sellerId,
        showId: "",
        goodsName: "",
        goodsPhoto:"https://i.loli.net/2021/07/16/ZjTgrV2WMzKLFBn.jpg",
        price: "",
        available: "",
      },
      rules: {
        showId: [
          { required: true, message: "请输入对应的演出ID", trigger: "blur" },
        ],
        goodsName: [
          { required: true, message: "请输入周边名称", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur",
          },
        ],
        description: [
          { required: true, message: "请输入周边简介", trigger: "blur" },
          {
            min: 1,
            max: 4000,
            message: "长度在 1 到 4000 个字符",
            trigger: "blur",
          },
        ],
        // goodsPhoto: [{ required: true, trigger: "blur" }],
        price: [{ required: true, message: "请输入周边价格", trigger: "blur" }],
        available: [{ required: true, trigger: "blur" }],
      },
      successVisible: false,
      confirmVisible: false,
    };
  },
  methods: {
    confirmForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.confirmVisible = true;
          // url;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formgoodsName) {
      this.$refs[formgoodsName].resetFields();
    },
    async Release() {
      const url = "/Goods";
      await axios
        .post(url, {
          sellerId: this.goodsForm.sellerId,
          showId: this.goodsForm.showId,
          goodsName: this.goodsForm.goodsName,
          goodsPhoto: this.goodsForm.goodsPhoto,
          price: this.goodsForm.price,
          available: this.goodsForm.available,
        })
        .then(() => {
          this.successVisible = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    bothRemove() {
      this.successVisible = false;
      this.confirmVisible = false;
      this.resetForm("goodsForm");
    },
    handleAvatarSuccess(res, file) {
      this.goodsForm.goodsPhoto = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error("上传座位图片只能是 JPG 格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传座位图片大小不能超过 5MB!");
      }
      return isJPG && isLt5M;
    },
    turnTo(routeName) {
      this.$router.push(
        "/" + routeName + "/" + sessionStorage.getItem("selId")
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.el-breadcrumb{
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 20px;
}


.addCard {
  margin-left: 55px;
  margin-top: 35px;
  margin-right: 50px;
  background-color: #5b79a523;
}

.goods-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.goods-uploader-icon {
  font-size: 48px;
  color: #04152c67;
  background-color: rgba(175, 180, 201, 0.164);
  width: 178px;
  height: 178px;
  line-height: 178px;
  /* text-align: center; */
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-input {
  width: 300px;
}
.el-input-number {
  width: 200px;
}
.el-form{
  width:250px
}
.button{
  width:400px
}
</style>
