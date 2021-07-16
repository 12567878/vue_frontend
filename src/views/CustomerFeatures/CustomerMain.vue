<template>
  <div id="allShows">
    <el-carousel height="250px" id="carousel">
      <el-carousel-item  ><!--添加链接-->
        <el-image  src="https://gw.alicdn.com/imgextra/i1/O1CN01BoJ8KM1YLjtPrfqbT_!!6000000003043-0-tps-1200-320.jpg"></el-image>
      </el-carousel-item >
      <el-carousel-item ><!--添加链接-->
        <el-image src="https://gw.alicdn.com/imgextra/i4/O1CN01Lo2aAV1Eq9swuZyK8_!!6000000000402-0-tps-1200-320.jpg"></el-image>
      </el-carousel-item>
    </el-carousel>
    <el-divider></el-divider>
    <div id="category">

    </div>
    <el-divider></el-divider>
    <el-card class="box-card"><!--给按钮添加链接-->
      <div slot="header" class="clearfix">
        <span>演出</span>
      </div>
      <el-row style="margin-left: 20px">
        <el-col class="col" :span="5" v-for="show in rec_shows" :key="show.id" ><index-item v-bind="show"></index-item></el-col>
      </el-row>

    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>电影</span>
      </div>
      <el-row style="margin-left: 20px">
        <el-col class="col" :span="5" v-for="movie in movies" :key="movie.id" ><index-item v-bind="movie"></index-item></el-col>
      </el-row>
    </el-card>
  </div>

</template>

<script>
import axios from 'axios'
import IndexItem from "@/components/indexItem";
export default
{
  name:"CustomerMain",
  components: {IndexItem},
  data()
  {
    return{
      shows:[],
      hasShow:false
    }
  },
  created:function()
  {
    this.getAllShows()
  },
  methods:
  {
    async getAllShows()
    {
      const url = '/GeneralShows'
      await axios.get(url).then(
        (response) =>
        {
          if(response.status === 200)
          {
            this.shows = response.data.value
          }
        }
      ).catch(
        (err) =>
        {
          console.log(err)
        }
      )
      if(this.shows.length !== 0)
      {
        this.hasShow = true
      }
    }
  },
  computed:{
    movies:function (){
      return this.shows.slice(4,8)
    },
    rec_shows:function (){
      return this.shows.slice(0,4)
    }
  }
}
</script>

<style>
#carousel{
  margin: 20px 0 20px 0;
}

#allShows{
  margin: 0 30px 0 30px;
}

#category{
  margin: 15px 0 15px 0;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.clearfix{
  text-align:left;
}

.box-card {
  margin:15px 0 15px 0
}

.col{
  margin: 0 15px 0 15px;
}
</style>