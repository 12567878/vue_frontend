<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item @click.native="turnTo('outline')"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>编辑资料</el-breadcrumb-item>
      <el-breadcrumb-item>填写资料</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="Info-card" shadow="always">
      <el-row type="flex" class="title" justify="space-around">
        <el-col :span="6"><div>项目</div></el-col>
        <el-col :span="12"><div>当前信息</div></el-col>
        <el-col :span="6"><div>操作</div></el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="6"><div>注册日期</div></el-col>
        <el-col :span="12"
          ><div>{{ Info.RegDate }}</div></el-col
        >
        <el-col :span="6"><div></div> </el-col>
      </el-row>

      <el-row type="flex" class="id" justify="space-around">
        <el-col :span="6"><div>累计收益</div></el-col>
        <el-col :span="12"
          ><div>￥{{ Info.Income }}</div></el-col
        >
        <el-col :span="6"><div></div> </el-col>
      </el-row>

      <el-row type="flex" class="id" justify="space-around">
        <el-col :span="6"><div>商家 ID</div></el-col>
        <el-col :span="12"
          ><div>{{ Info.ID }}</div></el-col
        >
        <el-col :span="6"><div></div> </el-col>
      </el-row>

     
      <el-row type="flex" justify="space-around">
        <el-col :span="6"><div>账号密码</div></el-col>
        <el-col :span="12"><div>**********</div></el-col>
        <el-col :span="6"
          ><div class="edit">
            <el-button
              icon="el-icon-edit"
              circle
              size="normal"
              @click="editPassword = true"
            ></el-button>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" justify="space-around">
        <el-col :span="6"><div>商家地址:</div></el-col>
        <el-col :span="12"
          ><div>{{ Info.Address }}</div></el-col
        >
        <el-col :span="6"
          ><div class="edit">
            <el-button
              icon="el-icon-edit"
              circle
              size="normal"
              @click="editAddress = true"
            ></el-button>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" class="PhoneNumber" justify="space-around">
        <el-col :span="6"><div>商家电话</div></el-col>
        <el-col :span="12"
          ><div>{{ Info.PhoneNumber }}</div></el-col
        >
        <el-col :span="6"
          ><div class="edit">
            <el-button
              icon="el-icon-edit"
              circle
              size="normal"
              @click="editPhoneNumber = true"
            ></el-button>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" class="logo" justify="space-around">
        <el-col :span="6"><div>商家logo:</div></el-col>
        <el-col :span="12"
          ><div>
            <img
              id="user-avatar"
              src="../assets/images/avatar.png"
              alt=""
            /></div
        ></el-col>

        <el-col :span="6"
          ><div class="edit">
           
          </div>
        </el-col>
      </el-row>
    </el-card>


    <!-- 更改密码的对话框 -->
    <el-dialog
      title="更改密码"
      :visible.sync="editPassword"
      width="500px"
      @close="editClosed"
    >
      <div>
        <el-form
          :model="passwordForm"
          status-icon
          label-position="left"
          :rules="rules"
          ref="passwordForm"
          label-width="120px"
        >
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input
              type="password"
              v-model="passwordForm.oldPassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="newPassword">
            <el-input
              type="password"
              v-model="passwordForm.newPassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkNewPassword">
            <el-input
              type="password"
              v-model="passwordForm.checkNewPassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editPassword = false">取 消</el-button>
        <el-button type="primary" @click="submitPassword">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 更改地址的对话框 -->
    <el-dialog
      title="更改地址"
      :visible.sync="editAddress"
      width="500px"
      @close="editClosed"
    >
      <div>
        <el-form
          :model="tempInfo"
          status-icon
          :rules="rules"
          ref="tempInfo"
          label-width="125px"
        >
          <el-form-item label="请输入新的地址" prop="tempAddress">
            <el-input
              v-model="tempInfo.tempAddress"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editAddress = false">取 消</el-button>
        <el-button type="primary" @click="submitInfo">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 更改电话的对话框 -->
    <el-dialog
      title="更改电话"
      :visible.sync="editPhoneNumber"
      width="500px"
      @close="editClosed"
    >
      <div>
        <el-form
          :model="tempInfo"
          status-icon
          :rules="rules"
          ref="tempInfo"
          label-width="125px"
        >
          <el-form-item label="请输入新的电话" prop="tempPhoneNumber">
            <el-input
              v-model="tempInfo.tempPhoneNumber"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editPhoneNumber = false">取 消</el-button>
        <el-button type="primary" @click="submitInfo">确 定</el-button>
      </div>
    </el-dialog>

   
  </div>
</template>

<script>
import axios from "axios";
import {sha256} from "js-sha256";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.passwordForm.checkNewPassword !== "") {
          this.$refs.passwordForm.validateField("checkNewPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      Info: {
        ID: "loading",
        SellerName: "loading",
        Address: "loading",
        RegDate: "loading",
        Photo: "loading",
        Income: "loading",
        PhoneNumber: 0,
      },
      tempInfo: {
        tempAddress: "loading",
        tempPhoto: "loading",
        tempPhoneNumber: 0,
      },
      passwordForm: {
        oldPassword: "",
        newPassword: "",
        checkNewPassword: "",
      },
      tokenValue: "",
      editName: false,
      editPassword: false,
      editAddress: false,
      editPhoneNumber: false,
      editIntroduction: false,
      editLogo: false,
      rules: {
        newPassword: [{ validator: validatePass, trigger: "blur" }],
        checkNewPassword: [{ validator: validatePass2, trigger: "blur" }],
        tempAddress: [
          // { required: true, trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur",
          },
        ],
        tempPhoneNumber: [
          // { required: true, trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "长度在为11个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created: function () {
    this.GetInfo();
  },
  methods: {
    submitPassword() {
      this.$refs['passwordForm'].validate((valid) => {
            if (valid) {
              this.tokenValue = sessionStorage.getItem("tokenValue");
              this.resetPassword();
              return true;
            } else {
              console.log('error submit!!');
              return false;
            }
      })
    },
    submitInfo() {
      this.$refs['tempInfo'].validate((valid) => {
        if (valid) {
          this.tokenValue = sessionStorage.getItem("tokenValue");
          this.resetInfo();
          return true;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    editClosed() {
      // this.$refs.tempInfo.resetFields();
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
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
    async GetInfo() {
      const url = "/PersonalCenter";
      await axios
        .post(url, {
          id: this.$route.params.sellerId,
          userType: "SELLER",
        })
        .then((response) => {
          this.Info = response.data;
          this.tempInfo.tempAddress = this.Info.Address;
          this.tempInfo.tempPhoneNumber = this.Info.PhoneNumber;
        })
        .catch((err) => {
          this.$message.error("加载失败！");
          console.log(err);
        });
    },
    async resetPassword() {
      const url = "/UserManage/ResetPassword?tokenValue="+ this.tokenValue+"&"+
          "oldPassword=" +sha256(this.passwordForm.oldPassword)+"&"+
          "newPassword=" +sha256(this.passwordForm.newPassword);
      await axios
        .post(url)
        .then(() => {
          this.$message.success("修改密码成功！");
          location.reload()
        })
        .catch((err) => {
          this.$message.error("修改密码失败！");
          console.log(err);
        });
    },
    async resetInfo() {
      console.log(this.tokenValue);
      console.log(this.tempInfo.tempAddress);
      console.log(this.tempInfo.tempPhoneNumber);
      console.log(this.tempInfo.tempPhoto);
      const url = "/UserManage/UpdatePersonalInfo?tokenValue="+this.tokenValue+'&'+"address="+this.tempInfo.tempAddress+'&'+"phone_number="+this.tempInfo.tempPhoneNumber+'&'+'photo='+"https://i.loli.net/2021/07/16/RGOHMAClNK9asPW.jpg";
      await axios
        .put(url)
        .then(() => {
          this.$message.success("修改信息成功！");
          this.editPhoneNumber= false
          location.reload()
        })
        .catch((err) => {
          this.$message.error("修改信息失败！");
          console.log(err);
        });
    },

    turnTo(routeName) {
      this.$router.push(
        "/" + routeName + "/" + sessionStorage.getItem("selId")
      );
    },
  },
};
</script>


<style scoped>


.el-breadcrumb{
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 20px;
}

.Info-card {
  max-width: 1300px;
  margin-left: 20px;
  background-color: rgba(78, 78, 124, 0.322);
}

.title {
  margin-bottom: 20px;
  font-size: 20px !important;
  padding: 10px;
  background-color: rgba(78, 78, 124, 0.253) !important;
  font-weight: bold;
}
.el-row {
  padding: 15px;
  font-size: 18px;
  color: rgb(31, 41, 77);
  background-color: #ffffff;
}
#user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
.el-button {
  color: #fff;
  background-color: rgba(74, 83, 134, 0.445);
}
.logo-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
</style>