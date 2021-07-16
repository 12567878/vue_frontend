<template>
<div style="margin-left: 80px;margin-right: 80px">
  <el-container>
    <el-main id="main">
      <!--'data:image/png;base64,'+showInfos.image-->

         <el-image style="height: 360px;width: 270px;"
         :src="imageURL">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>



      <div id="description" :style="'float: right;padding-right: '+(isShow?(390-(name.length-9)*10):310)+'px'" >
        <div id="title">{{name}}</div>
        <div v-if="isShow">
          <div>
            <i class="el-icon-star-off icon"></i>平均评分:{{avgRate===0?"暂无评分":avgRate}}
          </div>
          <div >
            <i class="el-icon-collection-tag icon"></i>标签:
            <span v-for="label in labels" :key="label">{{' '+label+' '}}</span>
          </div>
          <div v-if="isShow && !slots">
            <div style="height: fit-content;text-align: left">无演出</div>
          </div>
          <el-button @click="dialogVisible=true" type="primary" >去评价</el-button>
              <el-dialog
                  center
                  style="line-height: 1.8"
                  title="评价"
                  :visible.sync="dialogVisible"
                  width="30%"
                  :before-close="handleClose">
                  <div>评分:<el-rate
                      style="display: inline"
                      v-model="rating"></el-rate>
                  </div>
                  <div>
                    评价:
                  </div>
                  <el-input
                      type="textarea"
                      :rows="2"
                      placeholder="请输入内容"
                      v-model="textarea">
                  </el-input>

                  <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button>
              </span>
            </el-dialog>
        </div>
        <div>
          <div v-if="isGood">
          <div v-if="good_sellers">
              <i class="el-icon-user icon"></i>卖家:
              <el-select v-model="good_seller" placeholder="请选择">
                <el-option
                    v-for="item in good_sellers"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
              </el-select>
            </div>
            <div v-else>暂无卖家</div>
            <div v-if="good_seller">
              <div>
               <i class="el-icon-price-tag icon"></i>价格:￥{{good_info.price}}
              </div>
              <div>
               <i class="el-icon-s-home icon"></i>库存:{{good_info.available}}个
              </div>
              <div>
                购买数量:
                <el-input-number  v-model="good_num" label="购买数量" :min="1" :max="good_info.available"></el-input-number>
              </div>
              <div>总价:￥{{(good_info.price*good_num*discount).toFixed(2)}}</div>
              <el-button type="primary" @click="buyGood">购买</el-button>
            </div>
          </div>
        </div>

      </div>

      <div  v-if="isShow && slots">
        <el-divider class="divider"></el-divider>
        <el-date-picker
            style="float: left"
            id="picker"
            v-model="date"
            type="date"
            placeholder="选择日期">
        </el-date-picker>
        <el-collapse accordion style="margin: 60px 0 15px 0" v-if="sellers">
          <el-collapse-item v-for="seller in sellers" :key="seller">
            <div slot="title" style="margin-left: 10px;font-size: 20px;font-weight: bold">
              {{seller}}
            </div>
            <div v-if="filtered_slots">
              <div v-for="slot in slots" :key="slot.id" style="text-align: left;font-size: 20px;margin-left: 10px">
                <div v-if="slot.place===seller" class="slot">
                  {{slot.day+'   '+slot.timeStart+'--'+slot.timeEnd}}
                  <select-seat :name="name" :seller-id="slot.sellerId" :slot-id="slot.id" style="display: inline;float: right"></select-seat>
                </div>
              </div>
            </div>

          </el-collapse-item>
        </el-collapse>
        <div v-if="isGood">
          <div>
          </div>
        </div>
      </div>
      <el-divider class="divider" style="margin-top: 200px"></el-divider>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" style="display: block" @select="handleSelect">
        <el-menu-item index="2" >注意事项</el-menu-item>
        <el-menu-item index="3">评价</el-menu-item>
      </el-menu>
      <div v-if="activeIndex==='2'" class="text">
        <div v-if="isShow">
          <h3>演出介绍</h3>
          {{(!introduction?"暂无介绍":introduction)}}
        </div>
        <h3>注意事项</h3>
        <div>请勿吸烟</div>
        <div>请勿携带非本影院出售的食品饮料入场。</div>
        <div>观看影片时，请关掉手机。</div>
        <div>观众凭票进场，并请遵守《观众须知》观赏节目</div>
        <div>保持票面清洁，勿折叠，勿刻划，勿暴晒或接近高温物体</div>
      </div>
      <div v-if="activeIndex==='3'" style="text-align: left" >
        <div v-if="!comments">暂无评论</div>
        <div v-else>
          <el-card v-for="comment in comments" :key="comment.commentId" shadow="hover">
            <div slot="header" class="clearfix">
            <span style="margin-right: 20px">
              <span style="margin-right: 15px">{{'用户: '+comment.customerName+" "}}</span>
              <span>{{'发布时间: '+comment.time}}</span>
            </span>
              <el-button   v-if="comment.customerId.toString()===cusId" type="danger" @click="deleteCom(comment.commentId)">删除</el-button>
            </div>
            <el-rate
                v-model="comment.rate"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
            </el-rate>
            <div style="margin: 10px 0 10px 0">{{comment.content}}</div>
          </el-card>
        </div>
      </div>
    </el-main>

      <el-aside id="aside" v-if="recommends"><!--推荐卡片-->
        <recommend-item v-for="iteminfo in recommends" :key="iteminfo.id" v-bind="iteminfo"> </recommend-item>
        <div v-if="goods && isShow">
          <good-card v-for="good in goods" :key="good.name" v-bind="good"></good-card>
        </div>
      </el-aside>
  </el-container>
</div>
</template>

<script>
import RecommendItem from "@/components/recommendItem";
//import axios from "axios";
import GoodCard from "@/components/goodCard";
import axios from "axios";
import SelectSeat from "@/components/selectSeat";
import {Base64} from "js-base64";
export default {
  name: "detailedInfo",
  components: {SelectSeat, GoodCard, RecommendItem},

  data() {
    return{
      image:"",
      loading:false,
      price: 100,
      good_num:1,
      available:0,
      good_seller:"",
      good_infos:[],

      activeIndex:"2",


      date:"",
      name:'觉醒年代',
      introduction: "123",
      slots: [],
      goods: [{
        "name":'兔子',
        "sellerName": "test",
        "price": 100,
        "available": 100
      }],
      comments: [],
      labels: [
        "主旋律",
        "献礼"
      ],
      recommends:[],
      avgRate:0,
      dialogVisible:false,
      rating:0,
      textarea:"",
      sellerName:""
    }
  },
  computed:{
    imageURL:function (){
      if(!this.image)return ""
      else {
        return Base64.decode(this.image)
      }
    },
    cusId:function () {
      return sessionStorage.getItem("cusId")
    },
    discount:function () {
      return sessionStorage.getItem("discount")
    },
    good_sellers:function () {
      let sellers=[]
      for (let i = 0; i < this.good_infos.length; i++) {
        sellers.push(this.good_infos[i].sellerName)
      }
      return sellers
    },
    isShow:function () {
      return  this.$route.params.input[0]==='s'
    },
    isGood:function () {
      return !this.isShow;
    },
    dating:function () {
      if(!this.date) return ''
      let newdate=new Date(this.date)
      var Y = newdate.getFullYear();
      var M = newdate.getMonth() + 1;
      var D = newdate.getDate();
      return  Y + '/' +(M<10?"0":"")+ M + '/' + (D<10?"0":"")+D;
    },
    sellers:function (){
      let slots_array=[]
      for (let i = 0; i < this.slots.length; i++) {
        if( (!this.date || this.slots[i].day===this.dating) &&
            (slots_array.length===0 || slots_array.indexOf(this.slots[i].place)===-1))
        slots_array.push(this.slots[i].place)
      }
      return  slots_array
    },
    filtered_slots:function (seller){
      let slots_array=[]
      for (let i = 0; i < this.slots.length; i++) {
        if( !this.date || (this.slots[i].day===this.dating && this.slots[i].place===seller))
          slots_array.push(this.slots[i].place)
      }
      return  slots_array
    },
    good_info:function () {
      if(!this.good_seller)return{}
      else {
        for (let i = 0; i < this.good_infos.length; i++) {
          if(this.good_seller===this.good_infos[i].sellerName){
            return this.good_infos[i]
          }
        }
        return {}
      }
    }
  },

  watch:{

    $route(){
      location.reload()
    }
  },
  methods:{
    deleteCom:function (comId){
      axios.delete("/DeleteComment/"+comId).then(res=>{
        if(res.status===200){
          this.$message.success("删除成功")
          location.reload()
        }
      }).catch(e=>{
        console.log(e)
      })
    },
    getAllShows:async function ()
    {
      const url = '/GeneralShows'
      await axios.get(url).then(
          (response) =>
          {
            if(response.status === 200)
            {
              this.recommends=response.data.value.slice(0,1)
            }
          }
      ).catch(
          (err) =>
          {
            console.log(err)
          }
      )},
    handleSelect(key) {
      this.activeIndex=key;
    },
    updateInfo: async function (){
    let _this=this;
    if(_this.isShow){
      let showId=_this.$route.params.input.slice(1,_this.$route.params.input.length)
      await axios.get('/ParticularShow/'+showId).then(response=>{

        if(response.status === 200)
        {
          _this.slots = response.data.value.slots
          _this.introduction=response.data.value.introduction
          _this.goods=response.data.value.goods
          _this.name=response.data.value.name
          _this.avgRate=response.data.value.avgRate
          _this.comments=response.data.value.comments
          _this.image=response.data.value.image
        }
        else {
          this.$message.error("错误: "+response.status)
        }
      }).catch(e=>{
        console.log(e)
      })
    }
    else {
      await axios.get('/ParticularGoods/'+this.$route.params.input.slice(1,_this.$route.params.input.length)).then(response=>{
        if(response.status === 200)
        {
          if(response.data.value)
          _this.name=response.data.value[0].goodsName
          _this.image=response.data.value[0].image
          _this.good_infos=response.data.value
        }
      }).catch(e=>{
        console.log(e)
      })
    }
  },
    handleClose:function () {
      this.dialogVisible=false
    },
    onSubmit:function () {
      this.loading=true
      axios.post('/Comment',{
        "rate":this.rating,
        "content":this.textarea,
        "customerId":sessionStorage.getItem('cusId'),
        "showId":this.$route.params.input.slice(1,this.$route.params.input.length)
      },{headers: {'Content-Type': 'application/json'}}).then(response=>{
        if(response.status===200){
          this.$message({
            message: '评论成功',
            type: 'success'
          });
          this.dialogVisible=false
          location.reload()
        }
        else{
          this.$message.error('评论失败');
        }
        this.loading=false
      }).catch(e=>{
            this.$message.error('出现故障');
            this.loading=false
            console.log(e)
          }
      )
    },
    buyGood:async function(){
      if(!this.good_seller)return
      if(!sessionStorage.getItem('isLogin')){
       this.$message.error("请登录")
       return
      }
      await axios.post("/ParticularGoods",{
        "customerId": sessionStorage.getItem("cusId"),
        "sellerId": this.good_info.sellerId,
        "goodsId": this.$route.params.input.slice(1,this.$route.params.input.length),
        "goodsName": this.good_info.goodsName,
        "price": this.good_info.price,
        "number":this.good_num
      }).then(res=>{
        if(res.status===200){
          this.$message.success("购买成功")
          this.$router.push("/Orders/"+sessionStorage.getItem("cusId"))
        }
      }).catch(e=>{
        this.$message.error("出现错误，请重试或者刷新")
        console.log(e)
      })
    }
  },

  created() {
    this.getAllShows()
    this.updateInfo()
    /**axios.get("/GeneralShows").then(response=>{
      if(response.status === 200)
      {
        this.recommends = response.data.value
      }
    }).catch(e=>{
      console.log(e)
    })
    if(this.isShow){
      axios.get('/ParticularShow/'+this.$route.params.input).then(response=>{
        if(response.status === 200)
        {
          this.recommends = response.data.value
        }
      }).catch(e=>{
        console.log(e)
      })
    }
    if(this.isGood) {
      axios.get('/ParticularGood/'+this.$route.params.input).then(response=>{
        if(response.status === 200)
        {
          this.recommends = response.data.value
        }
      }).catch(e=>{
        console.log(e)
      })
    }**/
  }
}
</script>

<style scoped>

#picker{
  float: left !important;
}

.text{
  font-size: 15px;
  line-height: 1.9;
  text-align: left;
  color: #606266;
  margin: 20px;
}

#photo{
  height: 400px;
  width: 300px;
  display: inline;
  float: left
}

#description{
  line-height: 1.9;
  text-align: left;
  font-size: 16px;
  display: inline;
  width: fit-content;
}

#title{
  display: block;
  font-weight: bold;
  font-size: 25px;
  text-decoration: none;
  color: black;
  margin-bottom: 12px;
  text-align: left;
}

#main{
  text-align: left;
  height: fit-content;
}

.divider{
  margin: 10px 0 10px 0;
}
.slots{
  text-align: left;
}

.slot{
  margin: 10px 0 10px 0;
}
</style>