<template>
  <el-card shadow="hover">
    <div id="body">
      <span id="photo">
        <router-link :to="href">
          <el-image :src="imageURL"  fit="fill" >
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
             </div>
          </el-image>
        </router-link>

    </span>
      <span>
        <router-link :to="href"  id="title">{{name}}</router-link>
        <div style="line-height: 1.9;">
            <div class="text" style="color: #909399;margin-bottom: 50px"><!--改图片高度这个也要改-->
              <div style="text-align: left">
                <i class="el-icon-star-off icon"></i>平均评分:{{avgRate===null?"暂无评分":avgRate}}
              </div>
              <div class="text" v-if="labels">
                <i class="el-icon-collection-tag icon"></i>标签:
                <span v-for="label in labels" :key="label">{{' '+label+' '}}</span>
              </div>
            </div>
        </div>
      </span>
    </div>

  </el-card>
</template>

<script>
import {Base64} from "js-base64";

export default {
  name: "searchItem",
  props:{
    showId: Number,
    name: String,
    image: String,
    labels: {
      type:Array,
      default:function () {
        return[]
      }
    },
    avgRate: Number,
  },
  computed:{
    href:function () {
      return "/detailedInfo/s"+this.showId //得改
    },
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
  height: 168px;
  width: 126px;
  margin-right: 12px;
  float: left;
  margin-bottom: 20px;
}

#title{
  display: block;
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
  color: black;
  margin-bottom: 12px;
  text-align: left;
}

#price{
  color: #F56C6C;
  font-size: 18px;
  font-weight: bold;
  margin-right: 30px;
  float: left;
}

.text{
  font-size: 15px;
  line-height: 1.9;
  text-align: left;
}

#body{

}

.icon{
  color: #3096ff;
}
</style>