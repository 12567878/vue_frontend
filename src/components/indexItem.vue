<template>
  <router-link :to="'/detailedInfo/s'+showId" style="display: inline">
    <div slot="header" style="padding: 0;height: 0"></div>
    <el-card :body-style="{ padding: '0px' }" id="card">
      <el-image fit="fill" :src="imageURL" class="image"></el-image>
      <div style="padding: 5px 14px 14px 14px;">
        <div class="bottom clearfix">
          <div id="title" style="font-size: 15px;margin-bottom: 5px">{{ name }}</div>
          <span class="rate">评分:
          <el-rate
              v-model="avgRate"
              disabled
              show-score
              score-template="{value}"
          style="display: inline">
          </el-rate>
          </span>
        </div>
      </div>
    </el-card>
  </router-link>
</template>

<script>
import {Base64} from "js-base64";

export default {
  name: "indexItem",
  props:{
    showId: Number,
    name: String,
    image: String,
    avgRate: Number
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
.rate {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 3px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 220px;
  height: 250px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

a{
  text-decoration: none;
}

#card{
  width: 220px;
  margin: 30px 0 30px 0;
}

#title{
  line-height: 1.9;
  font-size: 15px;
}
</style>