<template>
  <el-card shadow="hover">
    <div slot="header" class="header">
      <span class="text" style="float: left;color: #909399;" >
       通知编号:{{id}}
      </span>
    </div>
    <div id="body">
      <div id="title">{{title}}</div>
      <div>{{content}}</div>
    </div>
    <div id="time">发布时间:{{time}}</div>
  </el-card>
</template>

<script>
export default {
  name: "noticeItem",
  props:{
    id: Number,
    time: String,
    title: String,
    content: String
  }
}
</script>

<style scoped>

.header{
  height: 25px;
}

#body{
  line-height: 1.8;
  font-size: 15px;
  text-align: left;
}

#title{
  line-height: 2.0;
  display: block;
  font-weight: bold;
  font-size: 18px;
  text-decoration: none;
  color: black;
  margin-bottom: 12px;
  text-align: left;
}

#time{
  text-align: left;
  margin-top: 20px;
  color: #C0C4CC;
}
</style>