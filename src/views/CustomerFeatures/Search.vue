<template>
    <el-container id="show">

      <el-main id="main">
        <div id="chooser"><!--选择器-->

          <div style="margin-top: 20px;margin-bottom: 20px">
            <span class="h">分类:</span>

              <el-checkbox style="margin-right: 20px" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-if="all_label.length" v-model="types" style="display: inline;" >
              <el-checkbox style="margin-bottom: 12px" @change="handleCheckedLabelChange" v-for="type in all_label" :key="type" :label="type"></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>

        <div v-if="showInfopage"><!--搜索结果展示-->
          <search-item v-for="showInfo in showInfopage"
                       :key="showInfo.showId" v-bind="showInfo"></search-item>
          <el-pagination
              style="margin-top: 25px"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage1"
              page-size="25"
              layout="total, prev, pager, next"
              :total="showInfopage.length">
          </el-pagination>
        </div>
      </el-main><!--搜索内容-->

      <el-aside id="aside">
        <recommend-item v-for="iteminfo in recommends" :key="iteminfo.id" v-bind="iteminfo"> </recommend-item>
      </el-aside><!--推荐卡片-->
    </el-container>

</template>

<script>
import SearchItem from "@/components/searchItem";
import RecommendItem from "@/components/recommendItem";
import axios from "axios";
export default
{
  name:"Search",
  components: {RecommendItem, SearchItem},
  created:function()
  {
    this.Search()
  },
  watch:{
    $route:function (){
      this.Search()
    }
  },
  beforeRouteUpdate(to, from, next) {
    console.info("==当前路由id==" + this.$route.params.id);
    if (this.$route.params.id) {
      console.info("加载页面数据");
    }
    next();
  },
  data()
  {
    return{
      checkAll: true,
      isIndeterminate: false,
      showInfos:[],
      city:'全国',
      search_type:'演出',
      currentPage1:1,
      timing:'全部',
      types:[],
      all_label:[]
    }
  },
  computed:{
    showInfopage:function () {
      if(this.showInfos.length===0)return []
      else {
        return this.showInfos.filter(show => {
          return this.checkAll||(show.labels!==null && !show.labels.every(label => {
            return  this.types.indexOf(label) === -1
          }))
        }
      )}
    },

    recommends:function () {
      return this.showInfos.slice(0,3)
    }
  },
  methods:
  {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleCheckAllChange(val) {
      this.types = val ? this.all_label : [];
      this.isIndeterminate = false;
    },
    handleCheckedLabelChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.all_label.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.all_label.length;
    },
    async Search()
    {
      let _this = this;
      if(this.$route.fullPath==="/SearchList/"){
        await axios.get("/GeneralShows").then(response=>{
          if(response.status===200){
            _this.setLabels( response.data.value)
           // for (let i = 0; i < response.data.value.length; i++) {
            //  if(response.data.value[i]!==null)
             // _this.showInfos.push(response.data.value[i])
            //}
            //alert(null.indexOf(this.showInfos))
            _this.showInfos=  response.data.value
          }
        }).catch(e=>{
          console.log(e)
        })
      }else {
        const url = '/Search/'+this.$route.params.input.toString()
        await axios.get(url).then(
            (response) =>
            {
              if(response.status === 200)//原来是两个等于号，我给改了..
              {
                //for (let i = 0; i < response.data.value.shows.length; i++) {
                //  this.showInfos.push(response.data.value.shows[i])
                //}
                _this.setLabels(response.data.value.shows)
                _this.showInfos=response.data.value.shows


              }
              else if(response.status === 404)
              {
                console.log("无匹配结果")
              }
            }
        )
            .catch(
                (err)=>
                {
                  console.log(err)
                }
            )
      }
    },
    setLabels:function (shows) {
      this.all_label=[]
      let labels=[]
      for (let index = 0; index < shows.length; index++) {
        labels.push(shows[index].labels)
      }
      labels=labels.reduce((a,b)=>a.concat(b))
      let label_set=new Set(labels)
      labels= Array.from(label_set)
      for (let i = 0; i < labels.length; i++) {
        if(labels[i]!==null)
          this.all_label.push(labels[i])
          this.types.push(labels[i])
      }
      //alert(null.indexOf(this.all_label))//很神奇，不加就没有
      //alert(null.indexOf(this.types))
    }
  }
}

</script>

<style>
#chooser{
  border: 1px solid #EBEEF5;
  margin-bottom: 20px;
  text-align: left;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 18px;
}

#main{
  padding-left: 100px;
}

.h{
margin-right: 10px;
}

#aside{
  border: 1px #DCDFE6;
  display: inline;
  margin-top: 20px;
}

#show{
  height: fit-content;
}
</style>