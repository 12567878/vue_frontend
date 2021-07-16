<template>
  <!--这个组件高度调整后会非常奇怪，下拉菜单会和上方内容重叠，所以请通过修改.body和图片大小调节此元素大小-->
  <el-card id="box-card" body-style="{ padding-bottom: '0px' }" shadow="hover"><!--我实在不知道怎么设置了,反正这个不行-->
    <div slot="header" class="clearfix">
      <span id="title">{{type}}<el-divider direction="vertical"></el-divider>订单号：{{id}}</span>
      <el-button id="delete" type="danger"  plain @click="deleteOrder"> 退单</el-button>
    </div>
    <div class="block body">
      <!--<span>
        <el-image :src="photo_src" class="photo inline" fit="fill">
          <div slot="placeholder" class="image-slot">
           加载中<span class="dot">...</span>
         </div>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </span>-->
      <span>
        <router-link :to="href" class="text block" id="item_title">{{type==="周边"?goodsName:showName}}</router-link>
        <div style="line-height: 1.9;">
          <div class="text" style="color: #909399;" >
            <div style="text-align: left" v-if="type==='演出'">
              <div><i class="el-icon-time"></i>场次：{{day+'   '+timeStart+'--'+timeEnd}}</div>
              <div><i class="el-icon-location-information"></i>地点：{{place}}</div>
            </div>
            <div class="text">
              <i class="el-icon-user"></i>商家：{{sellerName}}
            </div>
          </div>
          <div style="float: right;text-align: right" >
            <div>{{'￥'+price.toFixed(2)}}</div>
          </div>
        </div>
      </span>
    </div>
    <!--下面为详情-->
    <div>
      <el-collapse class="block">
        <el-collapse-item style="text-align: left">
          <template slot="title" >
            <span style="float: right;font-size: 16px">订单详情</span>
          </template>
          <!--这里偷了懒，建议用表格-->
          <div>支付时间:{{payTime}}</div>
          <div v-if="type==='演出'">
            <div>座位分区:{{areaName}}</div>
            <div>座位号:{{seatNumber}}</div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </el-card>
</template>

<script>

import axios from "axios";

export default {
  name: "orderItem",
  data(){
    return{
      dialogVisible: false,
      rating:0,
      textarea:'',
      loading:false
    }
  },
  props:{//更改props请使用智能更改
    id: String,
    sellerName: String,
    goodsName: {
      type:String,
      default:""
    },
    showName: {
    type:String,
    default:""
  },
    place:{
      type:String,
      default:""
    },
    day: {
      type:String,
      default:""
    },
    timeStart: {
      type:String,
      default:""
    },
    timeEnd: {
      type:String,
      default:""
    },
    areaName: {
      type:String,
      default:""
    },
    seatNumber: {
      type:Number,
      default:0
    },
    payTime:String,
    price: Number
  },
  computed:{
    href:function (){//商品信息的超链接
      return "/detailedInfo/"+this.id.toLowerCase()
    },
    type:function(){
      return this.id[0]==="G"?"周边":"演出"
    }
  },
  methods:{

    deleteOrder:function () {
      axios.delete("/AllOrder/"+this.id).then(response=>{
        if(response.status===200){
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          location.reload()
        } else if(response.status===400){
          this.$message.error('删除失败')
        }
      }).catch(e=>{
        this.$message.error('出现故障')
        console.log(e)
      })
    }
  },

}

</script>

<style scoped>
#item_title{
  display: block;
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
  color: black;
  margin-bottom: 12px;
}

.body{/*更改图片大小请一并更改.body的行高*/
  height: 170px;
}

.text {
  font-size: 15px;
  text-align: left;
}

.block{
  display: block;
}

.inline{
  display: inline;

}

.clearfix{
  color: #909399;
  object-fit: fill;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

#box-card {

}

#title{
  float: left;
  text-align: left;
  font-size: 18px;
  padding-top: 8px;
}

#delete{
  float: right;
}

a{
  text-decoration: none;
}

</style>