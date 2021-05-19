<!--考生答题界面-->
<template>
  <div class="box" style="opacity: 0.8;">
    <div >
      <div style="font-size:30px;text-align:center;margin-bottom:80px;margin-top:40px;">
          要先通过小测哦！
      </div>

      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        style="font-size:20px;"
      >

          <!-- 循环后端给你的所有题 -->
     <div v-for="(item, index) in ques" :key="item.id" style="">

        <div style=""></div>
          <div  > <!-- 题目的信息 -->
            <p style="font-weight: 700; color:#59888d;">
              第{{ index + 1 }}题：{{ item.question
              }}
            </p>
          </div>
          <!-- 题目绑定的值是 ruleForm.resource[index]  -->
          
          <div >
            <el-form-item label="" prop="resource" style="font-size:20px;margin-top:30px;border-bottom:1px solid #9fdf9f;padding-bottom:30px;" >
              <el-radio-group v-model="ruleForm.resource[index]" >
                <el-radio label="A" style="width:100px;" >{{ item.chioceA }}</el-radio>
                <el-radio label="B" style="width:100px;" >{{ item.chioceB }}</el-radio>
                <el-radio label="C" style="width:100px;" >{{ item.chioceC }}</el-radio>
                <el-radio label="D" style="width:100px;" >{{ item.chioceD }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>

       </div>  
        
          <!-- 提交函数  -->
          
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
          
   
  </div>
</template>

<script>
import { getInfo } from '@/api/quiz'
import { mapGetters } from 'vuex'

export default {
  name: 'Quiz',
  components: { },
  data() {
    return {
      ques: [],
      radio:[],
      ruleForm: {
        resource: [],
      } ,
      questionArrText: [],			//答题保存的数组
      score: null					    	//表单提交后，后端返回的总分
     
    }
  },
  mounted() {
    this.fetchInfo()
  },
  computed: {
    ...mapGetters(['token', 'user'])
  },
  created() {
    this.fetchInfo()
  },
  methods: {
    fetchInfo() {
       
       getInfo().then((res) => {
        const { data } = res
        // this.ques = data.user
        this.ques=data
        // console.log( this.topics);
        this.question = data			//页面循环的题
            for (let i = 0; i < this.question.length; i++) {
            	//初始化为一个数组，而不是普通的字符串
            	this.ruleForm.resource[i] = ''
			  
            }
            // this.questionArrText = data	//重新赋值，用来判断他是否全部答完
      })
 
    },

  
    submitForm(formName) {
       		
          
        var that = this
        var allScore=0;                                            
        for (var i = 0; i < this.questionArrText.length; i++) {
        
        if(that.ruleForm.resource[i]==that.questionArrText[i].answer){
            allScore+=20;
        }
        
        this.score=allScore;
        this.$router.push({path: '/quiz-score', query: {score:allScore}})
         console.log(allScore);
       
         }


    }
  }
}


</script>
