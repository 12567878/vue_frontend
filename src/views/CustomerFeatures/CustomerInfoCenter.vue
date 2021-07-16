<template>
  <el-container id="container">
    <el-aside id="aside">
      <!--点击按钮后切换路由，根据路由切换default-active-->
      <el-menu
          :default-active.sync="active"
          class="el-menu-vertical-demo menu"
          @select="handleSelect">
        <el-menu-item index="1" class="menu_item">
          <i class="el-icon-menu"></i>
          <span slot="title">个人中心</span>
        </el-menu-item>
        <el-menu-item index="2" class="menu_item">
          <i class="el-icon-menu"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>
        <el-menu-item index="3" class="menu_item">
          <i class="el-icon-document"></i>
          <span slot="title">查看通知</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-main v-if="active==='1'" class="center">
      <el-form
          :model="changePasswordForm"
          status-icon :rules="rules"
          ref="changePasswordForm"
          label-width="100px"
          class="demo-ruleForm"
          >
        <el-form-item label="账号" prop="account">
          <el-input
              :placeholder="id"
              :disabled="true">
        </el-input>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="用户名">
          <el-input
              disabled
              v-model="UserName"
              >
          </el-input>
        </el-form-item>
          <el-form-item label="地址">
            <el-input
                v-model="Address"
            >
            </el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input
              v-model="PhoneNumber"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-image style="width: 100px;height: 100px;object-fit: fill"  src="https://perico.damai.cn/userheadphotos/577160/115432124.jpg?r=0.5669333114520436"></el-image>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="submitInfo">提交</el-button>
        </el-form-item>

        <el-divider></el-divider>

        <el-form-item label="VIP等级">{{level}}</el-form-item>
        <el-form-item v-if="level==='0'" label="成为VIP"><el-button type="primary" @click="becomeVIP">点击成为VIP</el-button></el-form-item>
        <el-form-item v-if="level!=='0'" label="积分">{{point}}</el-form-item>
        <el-form-item v-if="level!=='0'" label="享受折扣">{{discount}}折</el-form-item>
        <el-form-item v-if="level!=='0'" label="旧密码" prop="old_pass" required>
          <el-input type="password" v-model="changePasswordForm.old_pass"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass" required>
          <el-input type="password" v-model="changePasswordForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass" required>
          <el-input type="password" v-model="changePasswordForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('changePasswordForm')">提交</el-button>
          <el-button type="danger" @click="withdraw_check=true">注销</el-button>
          <el-dialog
              title="警告"
              :visible.sync="withdraw_check"
              width="30%">
            <span>会永久删除账号，确认删除？</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="withdraw">确 定</el-button>
  </span>
          </el-dialog>
        </el-form-item>
      </el-form>
        <!--这个没弄明白，先不写-->
    </el-main>
    <el-main v-if="active==='2'">
      <div v-if="showsOrders">
        <order-item v-for="order in showsOrders" :key="order.id" v-bind="order"></order-item>
      </div>
      <div v-if="goodOrders">
        <order-item v-for="order in goodOrders" :key="order.id" v-bind="order"></order-item>
      </div>

    </el-main>

    <el-main v-if="active==='3' && notices">
      <notice-item v-for="notice in notices" :key="notice.id" v-bind="notice"></notice-item>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
import OrderItem from "@/components/orderItem";
import NoticeItem from "@/components/noticeItem";
import {sha256} from "js-sha256";
import {Base64} from "js-base64";

export default {
  name:"customerInfoCenter",
  components: {NoticeItem, OrderItem},
  data(){
    let checkOldPass = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('旧密码不能为空'));
      } else{
        callback();
      }

    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.changePasswordForm.checkPass !== '') {
          this.$refs.changePasswordForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.changePasswordForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      file:"",
      fileURL:"",
      Image:"",
      Address:"",
      PhoneNumber:0,
      UserName:"",
      withdraw_check:false,
      showsOrders:[],
      goodOrders:[],
      notices:[],
      active:'1',//改为从路由获取，在created里面写
      changePasswordForm: {
        pass: '',
        checkPass: '',
        old_pass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        old_pass: [
          { validator: checkOldPass, trigger: 'blur' }
        ]
      }
    };
  },
  computed:{
    id:function () {
      return sessionStorage.getItem('cusId')
    },
    level:function () {
      return sessionStorage.getItem('level')
    },
    point:function () {
      return sessionStorage.getItem('point')
    },
    discount:function () {
      return sessionStorage.getItem('discount')
    },
    imageURL:function (){
      if(!this.Image)return ""
      else {
        return Base64.decode(this.Image)
      }
    },
    file_base64:function() {
      return Base64.encode(this.fileURL)
    }
  },
  methods:{
    handleAvatarSuccess(res, file) {
      this.file=res.data().url
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    async getInfo(){
      await axios.post("/PersonalCenter",{
        "id":sessionStorage.getItem('cusId'),
        "usertype":"CUSTOMER"
      }).then(res=>{
        if(res.status===200){
          this.UserName=res.data.UserName
          this.Address=res.data.Address
          this.PhoneNumber=res.data.PhoneNumber
          this.Image=res.data.Image
        }
      })
    },
    async submitInfo(){
      await axios.put("/UserManage/UpdatePersonalInfo"
          +"?tokenValue="+sessionStorage.getItem("token")
          +"&address="+this.Address+"&phone_number="
          +this.PhoneNumber+"&photo="+123).then(res=>{
            if(res.status===200){
              this.$message.success("上传成功")
            }
      }).catch(e=>{
        this.$message.error("上传失败")
        console.log(e)
      })
    },

     withdraw() {
       axios.delete("/UserManage/DeleteUser?tokenValue="+sessionStorage.getItem("token")).then(res=>{
         if(res.status===200){
           this.$message.success("删除成功")
           this.withdraw_check=false
           sessionStorage.clear()
           this.$router.push("/")
         }
       }).catch(e=>{
         console.log(e)
       })
    }
  ,
    becomeVIP:async function (){
      await axios.post('/Vip/'+sessionStorage.getItem('cusId')).then(res=>{
        if(res.status===200){
          this.$message.success("成功")
          location.reload()
        }
      })
    },
   submitForm(formName) {
     this.$refs[formName].validate((valid) => {
       if (valid) {

         axios.post("/UserManage/ResetPassword"+"?tokenValue="+sessionStorage.getItem("token")
             +"&oldPassword=" +sha256(this.changePasswordForm.old_pass)
             +"&newPassword="+sha256(this.changePasswordForm.pass)).then(response=>{
           if(response.status===200){
             this.$message({
               message: '修改成功',
               type: 'success'
             });
             location.reload()
           }else if(response.status===400){
             this.$message.error('修改失败');
           }else if(response.status===404){
             this.$message.error('旧密码错误');
           }
         }).catch(e=>{
           console.log(e)
           this.$message.error('修改失败');
         })
       } else {
         console.log('提交失败!!');
         return false;
       }
     });
   },
   handleSelect(key) {
     this.active=key;
   }
 },
  created() {
    if(this.$route.fullPath==="/NoticeBoard/"+sessionStorage.getItem('cusId')){
      this.active="3"
    }else if(this.$route.fullPath==="/Orders/"+sessionStorage.getItem('cusId')){
      this.active="2"
    }else{
      this.active="1"
    }
    axios.get("/AllOrder/"+this.id).then(response=>{
      if(response.status===200){
        this.goodOrders=response.data.value.goodOrders
        this.showsOrders=response.data.value.showsOrders

      }
    }).catch(e=>{
      this.$message.error("订单信息加载错误")
      console.log(e)
    })
    axios.get("/GeneralCustomerNotice").then(response=>{
      if(response.status===200){
        this.notices=response.data.value
      } else if(response.status===400||response.status===404){
        this.$message.error('获取通知失败');
      }
    }).catch(e=>{
      console.log(e)
    })
    this.getInfo()
  },
  watch:{

  }
}
</script>

<style>

.demo-ruleForm{
  text-align: left;

}

.menu{
  text-align: left;
  width: 180px;
  margin-right: 0;
}

.center{
  width: auto;
  text-align: left;
}

#container{
margin: 0 10% 0 5%;
}

#aside{
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>