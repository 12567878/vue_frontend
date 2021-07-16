<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>


export default {
  name: 'App',
  components: {
  },
  data(){
    return{
      info:{
        type:"演出",
        id:123,
        name:"演出",
        photo_src:"",//图片超链接，base64的话请更改el-image的:src为其他值
        time:"2020-01-01",
        place:"地点",
        price:120,
        rate:null,
        item_num:1
      },
      notice_info:{
        "id": 6,
        "time": "2021/05/01",
        "title": "欢迎您成为小麦网的尊贵客户",
        "type": "系统通知",
        "content": "欢迎您成为小麦网的尊贵客户"
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  min-width: 100%;
}
</style>
