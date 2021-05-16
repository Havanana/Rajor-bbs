<template>
  <div id="answer">
    
    <div class="box" v-if="isMan" style="text-align:center;width:800px;height:500px;margin-top:50px;margin-left:140px;">
          <div style="font-size:30px;margin-top:130px;">满分！同意你的加入了！</div> 
          <br><br><br>
          <div style="font-size:20px;">
              还有<font color="orange">{{count}}</font>秒就自动跳转到注册页面哦~
          </div>
          <br><br>
          <b-button  @click="go()" style="background-color:#59888d;">
              去注册啦
          </b-button>
    </div>
     <div class="box" v-else style="text-align:center;width:800px;height:500px;margin-top:50px;margin-left:140px;">
          <div style="font-size:30px;margin-top:130px;">事实证明，你不行。回去重做！！</div> <br><br><br>
          <div style="font-size:20px;">还有<font color="orange">{{count}}</font>秒就自动跳转回测试页面哦~</div>
          <br><br>
          <b-button  @click="back()" style="background-color:#59888d;">
              回去做题
          </b-button>
    </div>     
    
  </div>
</template>

<script>
import { getInfo } from '@/api/quiz'
import { mapGetters } from 'vuex'

export default {
  name: 'quiz-score',
  components: { },
  data() {
    return {
      score:0,
      isMan:true,
      count:""
    }
  },
  mounted() {
    this.getScore()
  },
  computed: {
    ...mapGetters(['token', 'user'])
  },
  created() {
    this.getScore()
    this.goGrdoupRecor()
  },
  methods: {
    getScore(){
        this.score = this.$route.query.score
        if(this.score != 100){
            this.isMan=false;
        }
    } ,   
    goGrdoupRecor(){
        const TIME_COUNT = 3;
        if(!this.timer){
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(()=>{
            if(this.count > 0 && this.count <= TIME_COUNT){
            this.count--;
            }else{
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
            //跳转的页面写在此处
            if(this.isMan){
                this.$router.push({
                     path:'/register',
                   })
            }else{
                this.$router.push({
                     path:'/quiz',
                   })
            }
            
            }
        },1000)
        }
    },
    go() {
      this.$router.push({ path: '/register' })
    },
    
    //返回上一页
    
    back() {
      this.$router.push({ path: '/quiz' })
    },
  
   
  }
}


</script>
