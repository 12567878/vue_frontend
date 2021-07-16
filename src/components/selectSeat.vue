<template>
  <div>
    <el-button type="primary" plain @click="checkLogin">购买</el-button>
    <el-dialog
        title="购票"
        :visible.sync="dialogVisible"
        width="80%"
        center>
      <el-row style="margin-left: 10%">
        <el-col>
          <el-image :src="imageURL" id="photo"></el-image>
        </el-col>
        <el-col id="right">

        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <div class="block">
            <el-cascader
                v-if="options"
                :options="options"
                :props="props"
                v-model="choices"
                clearable></el-cascader>
          </div>
        <div >总价格:￥{{allMoney.toFixed(2)}}</div>
        <el-button type="primary" @click="buyTickets">购买</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import axios from "axios";
import {Base64} from "js-base64";

export default {
  name: "selectSeat",
  props:{
    slotId:Number,
    sellerId:Number,
    name:String
  },
  data() {
    return {
      props: {multiple: true},
      dialogVisible:false,
      options: [],
      choices: [],
      map: "",
      areas: []
    }
  },
  created() {
    this.setOptions()
  },
  methods:{
     setOptions:async function () {
       let _this=this;
       _this.options=[]
      await axios.get("/ParticularSlot/"+_this.slotId).then(res=>{
        if (res.status===200){
          _this.map=res.data.value.map
          _this.areas=res.data.value.areas
          for (let i = 0; i < this.areas.length; i++) {
            let child=[]
            for (let j = 0; j < this.areas[i].seatNumbers.length; j++) {
              child.push({
                label:_this.areas[i].seatNumbers[j],
                value:_this.areas[i].seatNumbers[j]
              })
            }
            _this.options.push(
                {
                  label:this.areas[i].name+"区  ￥"+this.areas[i].price,
                  value:this.areas[i].name,
                  children:child
                }
            )
          }
        }
      }).catch(e=>{
        console.log(e)
      })
    },
    buyTickets:async function (){
      let data=[]
      for (let i = 0; i < this.choices.length; i++) {
        data.push({
          "customerId": sessionStorage.getItem('cusId'),//sessionStorage.Id,
          "sellerId": this.sellerId,
          "name": this.name,
          "slotId": this.slotId,
          "areaName": this.choices[i][0],
          "seatNumber": this.choices[i][1],
          "price": this.getValue(this.choices[i][0])
        })
      }
      console.log(data)
      await axios.post("/ParticularSlot",data,{headers: {'Content-Type': 'application/json'}}).then(res=>{
        if(res.status===200){
          this.$message.success("购买成功")
          this.$router.push("/Orders/"+sessionStorage.getItem("cusId"))
        }
        if(res.status===400){
          this.$message.error("购买失败")
        }
      }).catch(e=>{
        console.log(e)
        this.$message.error("购买失败")
      })
    },
    getValue:function (name) {
      for (let i = 0; i < this.areas.length; i++) {
        if(name===this.areas[i].name){
          return this.areas[i].price
        }
      }
    },
     checkLogin:async function (){
       if(!sessionStorage.getItem('token')) {
         this.$message.error("请登录")
         return false
       }
      await axios.post(this.checkURL).then(
          (response)=>
          {
            if(response.status===200)
              this.dialogVisible=true
          }
      ).catch(
          (err) =>
          {
            this.$message.error("信息有误，请重试或刷新")
            console.log(err)
            return false
          }
      )
    }
  },
  computed:{
    imageURL:function () {
      if(!this.map)return ""
      else {
        return Base64.decode(this.map)
      }
    },
    allMoney:function () {
      let total=0
      for (let i = 0; i < this.choices.length; i++) {
        total+=this.getValue(this.choices[i][0])
      }
      return total*sessionStorage.getItem("discount");
    },
    checkURL:function () {
      return '/MainLogin?_token='+sessionStorage.getItem("token")
    }
  }
}
</script>

<style scoped>
#photo{
  width: 80%;
  object-fit: fill;
  margin-left:20px ;
}

#right{
  display: inline;
}

.block{
  margin: 15px 0 15px 0;
}
</style>