<template>
  <div >
     <el-card shadow="never">
      <div slot="header" class="clearfix">
        <el-tabs v-model="activeName" >
          <el-tab-pane label="~粉丝~" name="first">
            <article v-for="(item, index) in topics" :key="index" class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <Avatar  :username="item.username"
                          style=" vertical-align: middle;"
                          :inline="true">
                  </Avatar>
                </figure>
              </div>
              <div class="media-content">
                <div class="">
                  <p class="ellipsis is-ellipsis-1">
                      <router-link :to="{ path: `/member/${item.username}/home` }">
                        <span class="is-size-6">{{ item.username }}</span>
                      </router-link>
                  </p>
                </div>
                <nav class="level has-text-grey is-mobile  is-size-7 mt-2">
                  <div class="level-left">
                    <div class="level-left">
                      <router-link class="level-item" :to="{ path: `/member/${item.username}/home` }">
                        {{ item.bio }}
                      </router-link>

                      <span class="mr-1">
                       注册于:<a>{{ dayjs(item.createTime).format("YYYY/MM/DD") }}</a>  
                      </span>
                        
                      <span class="mr-1"  style="margin-left:10px;">
                        email:<a>{{ item.email }}</a>
                      </span>
                      
                      <span class="is-hidden-mobile" style="margin-left:10px;">等级:<code>{{ item.score }}</code></span>
                    </div>
                  </div>
                </nav>
              </div>
              <div class="media-right" />
            </article>
          </el-tab-pane>
          <el-tab-pane label="~关注~" name="hot">
            <article v-for="(item, index) in topics2" :key="index" class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <Avatar  :username="item.username"
                          style=" vertical-align: middle;"
                          :inline="true">
                  </Avatar>
                   <!-- :src="userInfo.avatar"  -->
                </figure>
              </div>
              <div class="media-content">
                <div class="">
                  <p class="ellipsis is-ellipsis-1">
                      <router-link :to="{ path: `/member/${item.username}/home` }">
                        <span class="is-size-6">{{ item.username }}</span>
                      </router-link>
                  </p>
                </div>
                <nav class="level has-text-grey is-mobile  is-size-7 mt-2">
                  <div class="level-left">
                    <div class="level-left">
                      <router-link class="level-item" :to="{ path: `/member/${item.username}/home` }">
                        {{ item.bio }}
                      </router-link>

                      <span class="mr-1">
                       注册于:<a>{{ dayjs(item.createTime).format("YYYY/MM/DD") }}</a>  
                      </span>
                        
                      <span class="mr-1"  style="margin-left:10px;">
                        email:<a>{{ item.email }}</a>
                      </span>
                      
                      <span class="is-hidden-mobile" style="margin-left:10px;">等级:<code>{{ item.score }}</code></span>
                    </div>
                  </div>
                </nav>
              </div>
              <div class="media-right" />
            </article>
          </el-tab-pane>
        </el-tabs>
      </div>

    
    </el-card>
  </div>
</template>

<script>
import { getInfoById } from '@/api/follow'
import { getInfoById2 } from '@/api/follow'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import Avatar from 'vue-avatar'

export default {
  name: 'Fans',
  components: { Pagination, Avatar},
  data() {
    return {
      activeName: 'first',
      userF:[],
      topics: [],
      userF2:[],
      topics2: [],
      data1:{}
    }
  },
  mounted() {
    this.fetchInfoById()
  },
  computed: {
    ...mapGetters(['token', 'user'])
  },
  created() {
    // this.init(this.tab)
    this.fetchInfoById()

  },
  methods: {
     fetchInfoById() {
       
       getInfoById(this.$route.params.id).then((res) => {
        const { data } = res
        this.userF = data.user
        this.data1=data
        this.topics = data.topics
        // console.log( this.topics);
      }),
      getInfoById2(this.$route.params.id).then((res) => {
        const { data } = res
        this.userF2 = data.user
        // this.data2=data
        this.topics2 = data.topics
        console.log( this.topics2);
      })
 
    }
  }
}


</script>

<style scoped>

</style>
