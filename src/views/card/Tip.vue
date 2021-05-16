<head>
      <meta name="referrer" content="no-referrer">
</head>
<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">
      <span>🔯 每日推荐</span>
    </div>
    <div>
         <a :href="tip.video" target="_blank">
          <div>
            <figure class="image is-5by3">
               <img :src="`https:${tip.imgurl}`" style="border-radius: 5px;" >  
               <!-- @click="open()" -->
            </figure>
            
          </div>
      <!-- <div class="has-text-left block">
        {{ tip.content }}
      </div> -->
      <div class="has-text-right mt-5 block" >
        ——{{ tip.song }}
      </div>
      </a>  
    </div>
  </el-card>
</template>

<script>
import {getTodayTip} from '@/api/tip'

export default {
  name: 'Tip',
  data() {
    return {
      tip: {}
    }
  },
  created() {
    this.fetchTodayTip()
  },
  methods: {
    fetchTodayTip() {
      getTodayTip().then(response => {
        const { data } = response
        this.tip = data
      })
    },
    open(){
           window.location.href = "https:"+this.tip.video;
          //  alert(this.tip.video);
       }
  }
}
</script>

<style scoped>

</style>
