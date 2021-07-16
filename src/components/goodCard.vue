<template>
  <router-link  :to="'/detailedInfo/g'+id"><!--不知道怎么加超链接-->
    <el-card shadow="hover">
      <el-image :src="imageURL"  fit="fill" id="photo" >
        <div slot="placeholder" class="image-slot">
          加载中<span class="dot">...</span>
        </div>
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
      <div id="description">
        <div id="title">相关周边：{{name}}</div>
      </div>
    </el-card>
  </router-link>
</template>

<script>
import {Base64} from "js-base64";

export default {
  name: "goodCard",
  props:{
    id:Number,
    name:String,
    sellerId:Number,
    image:String
  },
  computed:{
    imageURL:function (){
      if(!this.image)return ""
      else {
        return Base64.decode(this.image)
      }
    }
  }
}
</script>

<style scoped>
#photo{
  display: block;
  height: 80px;
  width: 60px;
}

#description{
  color: #909399;
  line-height: 1.9;
  text-align: left;
  font-size: 15px;
}

.icon{
  color: #3096ff;
}

#title{
  display: block;
  font-weight: bold;
  font-size: 18px;
  text-decoration: none;
  color: black;
  margin-bottom: 12px;
  text-align: left;
}

a{
  text-decoration: none;
}
</style>