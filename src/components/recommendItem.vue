<template>
  <router-link :to="'/detailedInfo/s'+showId"><!--不知道怎么加超链接-->
    <el-card shadow="hover">

        <el-image  :src="imageURL"  fit="fill" >
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>


      <div id="description">
        <div id="title" >{{name}}</div>
        <div>
          <i class="el-icon-star-off icon"></i>平均评分:{{avgRate===null?"暂无评分":avgRate}}
        </div>
        <div class="text" v-if="labels">
          <i class="el-icon-collection-tag icon"></i>标签:
          <span v-for="label in labels" :key="label">{{' '+label+' '}}</span>
        </div>
      </div>
    </el-card>
  </router-link>
  
</template>

<script>
import {Base64} from "js-base64";

export default {
  name: "recommendItem",
  props:{
    showId: Number,
    name: String,
    image: String,
    labels:Array,
    avgRate: Number,
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

  height: 40px;
  width: 30px;
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



a {
  text-decoration: none;
}
</style>