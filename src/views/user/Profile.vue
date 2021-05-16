<template>
  <div class="member">
    <div class="columns">
      <div class="column is-one-quarter">
        <el-card shadow="never">
          <div slot="header" class="has-text-centered">
            <el-avatar :size="64" :src="topicUser.avatar" />
            <!-- <figure class="image is-48x48">
              <Avatar :username="topicUser.username"
                      style=" vertical-align: middle;"
                      :inline="true">
              </Avatar>
            </figure> -->
            <p class="mt-3">{{ topicUser.alias || topicUser.username }}</p>
          </div>
          <div>
            <p class="content">积分：<code>{{ topicUser.score }} </code> <code>{{userfollow}}</code></p>
            <p class="content">入驻：{{ dayjs(topicUser.createTime).format("YYYY/MM/DD HH:MM:ss") }}{{userfollow}}</p>
            <p class="content">简介：{{ topicUser.bio }}</p>


             <el-popover
                placement="top"
                width="200"
                trigger="hover"
                :content="'粉丝数:'+ topicUser2.followerCount + '  --- 关注数：'+ topicUser2.followCount ">
                <el-button slot="reference" style="margin-left:50px;border:none;">
                  <b-button  type="is-primary" tag="router-link" :to="{name:'fans',params: {id:topicUser.id}}" outlined>
                      朋友圈
                  </b-button>
                </el-button>
              </el-popover>
          </div>
        </el-card>
      </div>

      <div class="column">
        <!--用户发布的话题-->
        <el-card class="box-card content" shadow="never">
          <div slot="header" class="has-text-weight-bold">
            <span>话题</span>
          </div>

          <div v-if="topics.length===0">
            暂无话题
          </div>

          <div v-else class="topicUser-info">
            <article v-for="(item, index) in topics" :key="index" class="media">
              <div class="media-content">
                <div class="content ellipsis is-ellipsis-1">
                  <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                    <router-link :to="{ name: 'post-detail', params: { id: item.id } }">
                      {{ item.title }}
                    </router-link>
                  </el-tooltip>
                </div>
                <nav class="level has-text-grey is-size-7">
                  <div class="level-left">
                    <span class="mr-1">
                      发布于:{{ dayjs(item.createTime).format("YYYY/MM/DD HH:mm:ss") }}
                    </span>
                  </div>
                </nav>
              </div>
              <div v-if="token" class="media-right">
                <div v-if="topicUser.username === user.username" class="level">
                  <div class="level-item mr-1">
                    <router-link :to="{name:'topic-edit',params: {id:item.id}}">
                      <span class="tag is-warning">编辑</span>
                    </router-link>
                  </div>
                  <div class="level-item">
                    <a @click="handleDelete(item.id)">
                      <span class="tag is-danger">删除</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <!--分页-->
          <pagination
            v-show="page.total > 0"
            class="mt-5"
            :total="page.total"
            :page.sync="page.current"
            :limit.sync="page.size"
            @pagination="fetchUserById"
          />
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfoByName } from '@/api/user'
import { getTopic } from '@/api/post'
import pagination from '@/components/Pagination/index'
import { mapGetters } from 'vuex'
import { deleteTopic } from '@/api/post'
import Avatar from 'vue-avatar'

export default {
  name: 'Profile',
  props: {
    userfollow: {
      type: Number,
      default: null
    }
  },
  components: { pagination, Avatar},
  data() {
    return {
      topicUser: {},
      topicUser2: {},
      topics: {},
      page: {
        current: 1,
        size: 5,
        total: 0
      }
 
    }
  },  
 

  mounted() {
    this.fetchUserById()
  },
  computed: {
    ...mapGetters(['token', 'user'])
  },
  created() {
    this.fetchUserById()
  },
  methods: {
    fetchUserById() {
      getInfoByName(this.$route.params.username, this.page.current, this.page.size).then((res) => {
        const { data } = res
        this.topicUser = data.user
        this.page.current = data.topics.current
        this.page.size = data.topics.size
        this.page.total = data.topics.total
        this.topics = data.topics.records
      }),
      getTopic(this.$route.params.id).then(response => {
        const { data } = response  
        this.topicUser2 = data.user
        
      })
      
    },
    jump(){
      this.$router.replace('/Fans')
    },
    handleDelete(id) {
      deleteTopic(id).then(value => {
        const { code, message } = value
        alert(message)

        if (code === 200) {
          setTimeout(() => {
            this.$router.push({ path: '/' })
          }, 500)
        }
      })
    }
  }
}

// console.log(temp);
</script>

<style scoped>

</style>
